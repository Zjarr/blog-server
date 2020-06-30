import { IUser } from '../../user/schema';

export const isAuthorized = async (session: IUser | null): Promise<boolean> => {
  try {
    if (!session) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
