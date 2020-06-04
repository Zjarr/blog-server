import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { decrypt, encrypt, isAuthorized } from '../../lib/functions';
import { forbidden, notFound, serverError, unauthorized } from '../../lib/values';
import { IPermission } from '../../role/schema';

import { UserModel } from '../model';
import { IPasswordInput, IUser, IUserSuccess } from '../schema';

export const password = async (_: object, args: { password: IPasswordInput }, ctx: IContext): Promise<IUserSuccess | IError> => {
  try {
    const { password } = args;
    const { session } = ctx;
    let authorized: boolean;

    if (password._id) {
      authorized = await isAuthorized(session, IPermission.UPDATE_USER, password._id);
    } else {
      authorized = await isAuthorized(session, IPermission.CREATE_USER);
    }

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const userFound: IUser = await UserModel.findById(password._id);

    if (!userFound) {
      return notFound('User does not exist');
    }

    const passwordMatch: boolean = decrypt(password.old, userFound.password);

    if (!passwordMatch) {
      return forbidden('Old password does not match');
    }

    const newPassword: string = encrypt(password.new);
    const userResult: IUser = await UserModel.findByIdAndUpdate(userFound._id, { password: newPassword }, { new: true });

    return {
      user: userResult
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
