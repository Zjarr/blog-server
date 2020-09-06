import { Document, PaginateResult } from 'mongoose';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized } from '../../utils/functions';
import { unauthorized } from '../../utils/values';

import { BlogModel } from '../model';
import { IBlog, IBlogsSuccess, IGetBlogsLastTwoInput } from '../schema';

interface ISearchQuery {
  active?: boolean;
}

const createSearchQuery = (query: IGetBlogsLastTwoInput): ISearchQuery => {
  const { active } = query;
  const searchQuery: ISearchQuery = {};

  if (active !== undefined) {
    searchQuery.active = active;
  }

  return searchQuery;
};

export const blogsLastTwo = async (_parent: object, args: { blogs: IGetBlogsLastTwoInput }, ctx: IContext): Promise<IBlogsSuccess | IError> => {
  const { blogs } = args;
  const { session } = ctx;
  const authorized: boolean = await isAuthorized(session);

  if (!authorized) {
    return unauthorized('You are not allowed to perform this action.');
  }

  const searchQuery: ISearchQuery = createSearchQuery(blogs);
  const blogsFound: PaginateResult<IBlog & Document> = await BlogModel.paginate(searchQuery, { sort: { updated: -2 }, limit: 1 });

  return {
    blogs: blogsFound.docs
  };
};
