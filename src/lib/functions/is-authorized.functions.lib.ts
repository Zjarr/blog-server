import { RoleModel } from '../../role/model';
import { IPermission, IRole } from '../../role/schema';
import { IUser } from '../../user/schema';

export const isAuthorized = async (session: IUser, permission: IPermission, userToUpdateId: string = null): Promise<boolean> => {
  try {
    if (!session) {
      return false;
    }

    // The user tries to update their profile
    if (session._id === userToUpdateId) {
      return true;
    }

    const roleFound: IRole = await RoleModel.findById(session.role);

    return roleFound && roleFound.active && roleFound.permissions && roleFound.permissions.includes(permission);
  } catch (error) {
    return false;
  }
};
