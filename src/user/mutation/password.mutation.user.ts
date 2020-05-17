import { Logger } from '../../../logger';

import { Context } from '../../context';
import { Error } from '../../error/schema';
import { decrypt, encrypt, isAuthorized } from '../../lib/functions';
import { forbidden, notFound, serverError, unauthorized } from '../../lib/values';
import { Permission } from '../../role/schema';

import { UserModel } from '../model';
import { PasswordInput, User, UserSuccess } from '../schema';

export const password = async (_: object, args: { user: PasswordInput }, ctx: Context): Promise<UserSuccess | Error> => {
  try {
    const { session } = ctx;
    const { user } = args;
    let authorized: boolean;

    if (user._id) {
      authorized = await isAuthorized(session, Permission.UPDATE_USER, user._id);
    } else {
      authorized = await isAuthorized(session, Permission.CREATE_USER);
    }

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const userFound: User = await UserModel.findById(user._id);

    if (!userFound) {
      return notFound('User does not exist');
    }

    const passwordMatch: boolean = decrypt(user.old, userFound.password);

    if (!passwordMatch) {
      return forbidden('Old password does not match');
    }

    const password: string = encrypt(user.new);
    const userResult: User = await UserModel.findByIdAndUpdate(userFound._id, { password }, { new: true });

    return {
      user: userResult
    };
  } catch (error) {
    Logger.error('Internal Server Error', { error, file: 'password.mutation.user' });

    return serverError('There was an error with this request. Please try again later');
  }
};
