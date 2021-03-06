import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { decrypt, encrypt, isAuthorized } from '../../utils/functions';
import { forbidden, notFound, serverError, unauthorized } from '../../utils/values';

import { UserModel } from '../model';
import { IUser, IUserPasswordInput, IUserSuccess } from '../schema';

export const password = async (_parent: object, args: { password: IUserPasswordInput }, ctx: IContext): Promise<IUserSuccess | IError> => {
  try {
    const { password } = args;
    const { session } = ctx;
    const authorized: boolean = await isAuthorized(session);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action.');
    }

    const userFound: IUser | null = await UserModel.findById(password._id);

    if (!userFound) {
      return notFound('User does not exist.');
    }

    const passwordMatch: boolean = decrypt(password.current, userFound.password!);

    if (!passwordMatch) {
      return forbidden('Old password does not match.');
    }

    const updatedPassword: string = encrypt(password.updated);
    const userResult: IUser | null = await UserModel.findByIdAndUpdate(userFound._id, { password: updatedPassword }, { new: true });

    return {
      user: userResult
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later.');
  }
};
