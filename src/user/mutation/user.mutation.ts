import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import Moment from 'moment';

import { AdminAPI, uploadImage, usersUploadOptions } from '../../../cloud';
import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { encrypt, getImageUnique, isAuthorized } from '../../utils/functions';
import { serverError, unauthorized } from '../../utils/values';

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

    const userFound: IUser | null = await UserModel.findOne({ _id: user._id });
    let uploadResult: UploadApiErrorResponse | UploadApiResponse | null = null;
    let userResult: IUser | null;

    if (user.file) {
      uploadResult = await uploadImage(user.file, usersUploadOptions);
      user.image = uploadResult?.secure_url;
    }

    if (user.file && userFound?.image) {
      const unique = getImageUnique(userFound?.image, usersUploadOptions.folder);

      await AdminAPI.delete_resources([unique]);
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
