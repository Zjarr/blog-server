import { Document, PaginateResult } from 'mongoose';

import { Context } from '../../context';
import { Error } from '../../error/schema';
import { isAuthorized, paginationResult } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { Pagination } from '../../pagination/schema';
import { Permission } from '../../role/schema';

import { UserModel } from '../model';
import { GetUsersInput, User, UsersSuccess } from '../schema';

interface SearchQuery {
  active?: boolean;
}

const createSearchQuery = (query: GetUsersInput): SearchQuery => {
  const searchQuery: SearchQuery = { };
  const { active } = query;

  if (active) {
    searchQuery.active = active;
  }

  return searchQuery;
};

export const users = async (_: object, args: { users: GetUsersInput }, ctx: Context): Promise<UsersSuccess | Error> => {
  try {
    const { session } = ctx;
    const authorized = await isAuthorized(session, Permission.VIEW_USER);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const { users } = args;
    const searchQuery: SearchQuery = createSearchQuery(users);
    const usersFound: PaginateResult<User & Document> = await UserModel.paginate(searchQuery, { ...users.pagination });
    const pagination: Pagination = paginationResult(usersFound);

    return {
      pagination,
      users: usersFound.docs
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
