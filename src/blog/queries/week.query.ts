import { addDays, format, subDays } from 'date-fns';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized } from '../../utils/functions';
import { unauthorized } from '../../utils/values';

import { BlogModel } from '../model';
import { IBlog, IBlogsReport, IBlogsWeekSuccess } from '../schema';

interface ISearchQuery {
  created: {
    $gte: Date
  }
}

const createWeekBlogsReportArray = (): IBlogsReport[] => {
  const blogsReport: IBlogsReport[] = Array.apply(null, new Array(7)) as IBlogsReport[];
  let day: Date = subDays(new Date(), 7);

  return blogsReport.map(() => {
    day = addDays(day, 1);

    return { day: format(day, 'EEE'), blogs: 0 };
  });
};

const updateBlogsReportArray = (blogs: IBlog[]): IBlogsReport[] => {
  const blogsReport = createWeekBlogsReportArray();

  blogs.forEach((blog) => {
    const blogDay = format(new Date(blog.created), 'EEE');

    blogsReport.find((blog) => blog.day === blogDay)!.blogs++;
  });

  return blogsReport;
};

const createSearchQuery = (): ISearchQuery => {
  const lastWeekDayDate = subDays(new Date(), 7);

  return {
    created: {
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
