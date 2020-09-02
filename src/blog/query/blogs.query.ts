import Moment from 'moment';
import { Document, PaginateResult } from 'mongoose';

import { IError } from '../../error/schema';
import { IPagination } from '../../pagination/schema';
import { paginationResult } from '../../utils/functions';
import { DEFAULT_DATE_FORMAT, serverError } from '../../utils/values';

import { BlogModel } from '../model';
import { IBlog, IBlogsSuccess, IGetBlogsInput } from '../schema';

interface ISearchQuery {
  active?: boolean;
  categories?: string;
  name?: {
    $regex: RegExp;
  };
  updated?: {
    $gte: Date;
  };
}

const createSearchQuery = (query: IGetBlogsInput): ISearchQuery => {
  const { active, category, name, updated } = query;
  const searchQuery: ISearchQuery = {};

  if (active !== undefined) {
    searchQuery.active = active;
  }

  if (category) {
    searchQuery.categories = category;
  }

  if (name) {
    searchQuery.name = {
      $regex: new RegExp(`${name}`, 'i')
    };
  }

  if (updated) {
    searchQuery.updated = {
      $gte: new Date(Moment().utc().subtract(updated, 'd').format(DEFAULT_DATE_FORMAT))
    };
  }

  return searchQuery;
};

export const blogs = async (_: object, args: { blogs: IGetBlogsInput }): Promise<IBlogsSuccess | IError> => {
  try {
    const { blogs } = args;
    const searchQuery: ISearchQuery = createSearchQuery(blogs);
    const blogsFound: PaginateResult<IBlog & Document> = await BlogModel.paginate(searchQuery, { ...blogs.pagination });
    const pagination: IPagination = paginationResult(blogsFound);

    return {
      blogs: blogsFound.docs,
      pagination
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later.');
  }
};
