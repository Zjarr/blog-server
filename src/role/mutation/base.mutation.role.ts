import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';

import { RoleModel } from '../model';
import { IPermission, IRole, IRoleInput, IRoleSuccess } from '../schema';

export const role = async (_: object, args: { role: IRoleInput }, ctx: IContext): Promise<IRoleSuccess | IError> => {
  try {
    const { role } = args;
    const { session } = ctx;
    let authorized: boolean;

    if (role._id) {
      authorized = await isAuthorized(session, IPermission.UPDATE_ROLE);
    } else {
      authorized = await isAuthorized(session, IPermission.CREATE_ROLE);
    }

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const formatedName = role.name.trim().toLowerCase();
    let roleResult: IRole;

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
