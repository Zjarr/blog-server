import { UploadApiResponse } from 'cloudinary';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { AdminAPI, ImageUploader, usersUploadOptions } from '../../lib/cloud';
import { getImageUnique, isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { IPermission } from '../../role/schema';

import { UserModel } from '../model';
import { IPictureInput, IUser, IUserSuccess } from '../schema';

export const picture = async (_: object, args: { user: IPictureInput }, ctx: IContext): Promise<IUserSuccess | IError> => {
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

    let picture: string;
    let uploadResult: UploadApiResponse;

    if (user.old) {
      const unique: string = getImageUnique(user.old, usersUploadOptions.folder);
      await AdminAPI.delete_resources([unique]);
    }

    if (user.new) {
      uploadResult = await ImageUploader.upload(user.new, usersUploadOptions);
      picture = uploadResult.secure_url;
    }

    const userResult: IUser = await UserModel.findByIdAndUpdate(user._id, { picture }, { new: true });

    return {
      user: userResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
