import { Logger } from '../../../logger';

import { Context } from '../../context';
import { Error } from '../../error/schema';
import { isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';

import { RoleModel } from '../model';
import { GetRoleInput, Permission, Role, RoleSuccess } from '../schema';

interface SearchQuery {
  _id?: string;
  name?: string;
}

const createSearchQuery = (query: GetRoleInput): SearchQuery => {
  const searchQuery: SearchQuery = { };
  const { _id, name } = query;

  if (_id) {
    searchQuery._id = _id;
  }

  if (name) {
    searchQuery.name = name;
  }

  return searchQuery;
};

export const role = async (_: object, args: { role: GetRoleInput }, ctx: Context): Promise<RoleSuccess | Error> => {
  try {
    const { session } = ctx;
    const authorized = await isAuthorized(session, Permission.VIEW_ROLE);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const { role } = args;
    const searchQuery = createSearchQuery(role);
    const roleResult: Role = await RoleModel.findOne(searchQuery);

    return {
      role: roleResult
    };
  } catch (error) {
    Logger.error('Internal Server Error', { error, file: 'role.query.role' });

    return serverError('There was an error with this request. Please try again later');
  }
};
