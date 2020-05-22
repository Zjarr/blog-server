import Moment from 'moment';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { encrypt, isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { IPermission } from '../../role/schema';

import { UserModel } from '../model';
import { IUser, IUserInput, IUserSuccess } from '../schema';

export const user = async (_: object, args: { user: IUserInput }, ctx: IContext): Promise<IUserSuccess | IError> => {
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

    let userResult: IUser;

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
