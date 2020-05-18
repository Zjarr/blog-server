import { Context } from '../../context';
import { Error } from '../../error/schema';
import { isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';

import { RoleModel } from '../model';
import { Permission, Role, RoleInput, RoleSuccess } from '../schema';

export const role = async (_: object, args: { role: RoleInput }, ctx: Context): Promise<RoleSuccess | Error> => {
  try {
    const { role } = args;
    const { session } = ctx;
    let authorized: boolean;

    if (role._id) {
      authorized = await isAuthorized(session, Permission.UPDATE_ROLE);
    } else {
      authorized = await isAuthorized(session, Permission.CREATE_ROLE);
    }

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const formatedName = role.name.trim().toLowerCase();
    let roleResult: Role;

    if (role._id) {
      roleResult = await RoleModel.findByIdAndUpdate(role._id, {...role, name: formatedName}, { new: true });
    } else {
      roleResult = await RoleModel.create({ ...role, name: formatedName });
    }

    return {
      role: roleResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
