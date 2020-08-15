import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import Moment from 'moment';

import { uploadImage, usersUploadOptions } from '../../../cloud';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { encrypt, isAuthorized } from '../../utils/functions';
import { conflict, serverError, unauthorized } from '../../utils/values';

import { UserModel } from '../model';
import { IUser, IUserInput, IUserSuccess } from '../schema';

export const user = async (_: object, args: { user: IUserInput }, ctx: IContext): Promise<IUserSuccess | IError> => {
  try {
    const { user } = args;
    const { session } = ctx;
    const authorized: boolean = await isAuthorized(session);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const userFound: IUser | null = await UserModel.findOne({ email: user.email });

    if (!user._id && userFound) {
      return conflict('Already exists an user with the provided email');
    }

    let uploadResult: UploadApiErrorResponse | UploadApiResponse | null = null;
    let userResult: IUser | null;

    if (user.file) {
      uploadResult = await uploadImage(user.file, usersUploadOptions);
      user.image = uploadResult?.secure_url;
    }

    if (user._id) {
      userResult = await UserModel.findByIdAndUpdate(user._id, { ...user }, { new: true });
    } else {
      const created = Moment().utc().format('YYYY-MM-DDTHH:mm:ss');

      user.password = encrypt(user.password!);
      userResult = await UserModel.create({ ...user, created });
    }

    return {
      user: userResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
