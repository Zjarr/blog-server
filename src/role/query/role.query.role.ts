import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';

import { RoleModel } from '../model';
import { IGetRoleInput, IPermission, IRole, IRoleSuccess } from '../schema';

interface ISearchQuery {
  _id?: string;
  name?: string;
}

const createSearchQuery = (query: IGetRoleInput): ISearchQuery => {
  const searchQuery: ISearchQuery = { };
  const { _id, name } = query;

  if (_id) {
    searchQuery._id = _id;
  }

  if (name) {
    searchQuery.name = name;
  }

  return searchQuery;
};

export const role = async (_: object, args: { role: IGetRoleInput }, ctx: IContext): Promise<IRoleSuccess | IError> => {
  try {
    const { session } = ctx;
    const authorized = await isAuthorized(session, IPermission.VIEW_ROLE);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const { role } = args;
    const searchQuery = createSearchQuery(role);
    const roleResult: IRole = await RoleModel.findOne(searchQuery);

    return {
      role: roleResult
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
