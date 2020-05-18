import Moment from 'moment';

import { Context } from '../../context';
import { Error } from '../../error/schema';
import { encrypt, isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { Permission } from '../../role/schema';

import { UserModel } from '../model';
import { User, UserInput, UserSuccess } from '../schema';

export const user = async (_: object, args: { user: UserInput }, ctx: Context): Promise<UserSuccess | Error> => {
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

    let userResult: User;

    if (user._id) {
      delete user.password;

      userResult = await UserModel.findByIdAndUpdate(user._id, { ...user }, { new: true });
    } else {
      user.password = encrypt(user.password);

      const created = Moment().utc().format('YYYY-MM-DDTHH:mm:ss');
      userResult = await UserModel.create({ ...user, created });
    }

    return {
      user: userResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
