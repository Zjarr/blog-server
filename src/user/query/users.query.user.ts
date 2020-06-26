import { Document, PaginateResult } from 'mongoose';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { IPagination } from '../../pagination/schema';
import { IPermission } from '../../role/schema';
import { isAuthorized, paginationResult } from '../../utils/functions';
import { serverError, unauthorized } from '../../utils/values';

import { UserModel } from '../model';
import { IGetUsersInput, IUser, IUsersSuccess } from '../schema';

interface ISearchQuery {
  active?: boolean;
}

const createSearchQuery = (query: IGetUsersInput): ISearchQuery => {
  const searchQuery: ISearchQuery = { };
  const { active } = query;

  if (active) {
    searchQuery.active = active;
  }

  return searchQuery;
};

export const users = async (_: object, args: { users: IGetUsersInput }, ctx: IContext): Promise<IUsersSuccess | IError> => {
  try {
    const { session } = ctx;
    const authorized = await isAuthorized(session, IPermission.VIEW_USER);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const { users } = args;
    const searchQuery: ISearchQuery = createSearchQuery(users);
    const usersFound: PaginateResult<IUser & Document> = await UserModel.paginate(searchQuery, { ...users.pagination });
    const pagination: IPagination = paginationResult(usersFound);

    return {
      pagination,
      users: usersFound.docs
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
