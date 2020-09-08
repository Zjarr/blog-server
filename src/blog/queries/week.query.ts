import Moment from 'moment';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized } from '../../utils/functions';
import { DEFAULT_DATE_FORMAT, unauthorized } from '../../utils/values';

import { BlogModel } from '../model';
import { IBlog, IBlogsReport, IBlogsWeekSuccess } from '../schema';

interface ISearchQuery {
  updated: {
    $gte: Date
  }
}

const createWeekBlogsReportArray = (): IBlogsReport[] => {
  const blogsReport: IBlogsReport[] = Array.apply(null, new Array(7)) as IBlogsReport[];
  const sevenDaysAgoDate = Moment().utc().subtract(7, 'd');

  return blogsReport.map(() => {
    return { day: sevenDaysAgoDate.add(1, 'd').format('ddd'), blogs: 0 };
  });
};

const updateBlogsReportArray = (blogs: IBlog[]): IBlogsReport[] => {
  const blogsReport = createWeekBlogsReportArray();

  blogs.forEach((blog) => {
    const blogDay = Moment(blog.updated, DEFAULT_DATE_FORMAT).format('ddd');

    blogsReport.find((blog) => blog.day === blogDay)!.blogs++;
  });

  return blogsReport;
};

const createSearchQuery = (): ISearchQuery => {
  const lastWeekDayDate = Moment().utc().subtract(7, 'd').format(DEFAULT_DATE_FORMAT);

  return {
    updated: {
      $gte: new Date(lastWeekDayDate)
    }
  };
};

export const blogsWeek = async (_parent: object, _args: object, ctx: IContext): Promise<IBlogsWeekSuccess | IError> => {
  const { session } = ctx;
  const authorized: boolean = await isAuthorized(session);

  if (!authorized) {
    return unauthorized('You are not allowed to perform this action.');
  }

  const searchQuery: ISearchQuery = createSearchQuery();
  const blogsFound: IBlog[] = await BlogModel.find(searchQuery);
  const blogsReport = updateBlogsReportArray(blogsFound);

  return {
    report: blogsReport
  };
};
