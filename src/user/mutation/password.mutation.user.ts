import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { decrypt, encrypt, isAuthorized } from '../../lib/functions';
import { forbidden, notFound, serverError, unauthorized } from '../../lib/values';
import { IPermission } from '../../role/schema';

import { UserModel } from '../model';
import { IPasswordInput, IUser, IUserSuccess } from '../schema';

export const password = async (_: object, args: { user: IPasswordInput }, ctx: IContext): Promise<IUserSuccess | IError> => {
  try {
    const { session } = ctx;
    const { user } = args;
    let authorized: boolean;

    if (user._id) {
      authorized = await isAuthorized(session, IPermission.UPDATE_USER, user._id);
    } else {
      authorized = await isAuthorized(session, IPermission.CREATE_USER);
    }

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const userFound: IUser = await UserModel.findById(user._id);

    if (!userFound) {
      return notFound('User does not exist');
    }

    const passwordMatch: boolean = decrypt(user.old, userFound.password);

    if (!passwordMatch) {
      return forbidden('Old password does not match');
    }

    const password: string = encrypt(user.new);
    const userResult: IUser = await UserModel.findByIdAndUpdate(userFound._id, { password }, { new: true });

    return {
      user: userResult
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
