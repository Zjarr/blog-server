import { Document, PaginateResult } from 'mongoose';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { IPagination } from '../../pagination/schema';
import { isAuthorized, paginationResult } from '../../utils/functions';
import { serverError, unauthorized } from '../../utils/values';

import { RoleModel } from '../model';
import { IGetRolesInput, IPermission, IRole, IRolesSuccess } from '../schema';

interface ISearchQuery {
  active?: boolean;
}

const createSearchQuery = (query: IGetRolesInput): ISearchQuery => {
  const searchQuery: ISearchQuery = {};
  const { active } = query;

  if (active) {
    searchQuery.active = active;
  }

  return searchQuery;
};

export const roles = async (_: object, args: { roles: IGetRolesInput }, ctx: IContext): Promise<IRolesSuccess | IError> => {
  try {
    const { session } = ctx;
    const authorized = await isAuthorized(session, IPermission.VIEW_ROLE);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const { roles } = args;
    const searchQuery: ISearchQuery = createSearchQuery(roles);
    const rolesFound: PaginateResult<IRole & Document> = await RoleModel.paginate(searchQuery, { ...roles.pagination });
    const pagination: IPagination = paginationResult(rolesFound);

    return {
      pagination,
      roles: rolesFound.docs
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
