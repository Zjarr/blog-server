import { RoleModel } from '../../role/model';
import { Permission, Role } from '../../role/schema';
import { User } from '../../user/schema';

export const isAuthorized = async (session: User, permission: Permission, userToUpdateId: string = null): Promise<boolean> => {
  try {
    if (!session) {
      return false;
    }

    // The user tries to update their profile
    if (session._id === userToUpdateId) {
      return true;
    }

    const roleFound: Role = await RoleModel.findById(session.role);

    return roleFound && roleFound.active && roleFound.permissions && roleFound.permissions.includes(permission);
  } catch (error) {
    return false;
  }
};
