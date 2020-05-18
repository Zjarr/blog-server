import { Document, PaginateResult } from 'mongoose';

import { Context } from '../../context';
import { Error } from '../../error/schema';
import { isAuthorized, paginationResult } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { Pagination } from '../../pagination/schema';

import { RoleModel } from '../model';
import { GetRolesInput, Permission, Role, RolesSuccess } from '../schema';

interface SearchQuery {
  active?: boolean;
}

const createSearchQuery = (query: GetRolesInput): SearchQuery => {
  const searchQuery: SearchQuery = { };
  const { active } = query;

  if (active) {
    searchQuery.active = active;
  }

  return searchQuery;
};

export const roles = async (_: object, args: { roles: GetRolesInput }, ctx: Context): Promise<RolesSuccess | Error> => {
  try {
    const { session } = ctx;
    const authorized = await isAuthorized(session, Permission.VIEW_ROLE);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const { roles } = args;
    const searchQuery: SearchQuery = createSearchQuery(roles);
    const rolesFound: PaginateResult<Role & Document> = await RoleModel.paginate(searchQuery, { ...roles.pagination });
    const pagination: Pagination = paginationResult(rolesFound);

    return {
      pagination,
      roles: rolesFound.docs
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
