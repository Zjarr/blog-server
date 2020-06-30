import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

import { AdminAPI, uploadImage, usersUploadOptions } from '../../../cloud';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { getImageUnique, isAuthorized } from '../../utils/functions';
import { serverError, unauthorized } from '../../utils/values';

import { UserModel } from '../model';
import { IPictureInput, IUser, IUserSuccess } from '../schema';

export const picture = async (_: object, args: { picture: IPictureInput }, ctx: IContext): Promise<IUserSuccess | IError> => {
  try {
    const { picture } = args;
    const { session } = ctx;
    const authorized: boolean = await isAuthorized(session);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    let uploadResult: UploadApiErrorResponse | UploadApiResponse | null = null;

    if (picture.url) {
      const unique: string = getImageUnique(picture.url, usersUploadOptions.folder);
      await AdminAPI.delete_resources([unique]);
    }

    if (picture.file) {
      uploadResult = await uploadImage(picture.file, usersUploadOptions);
    }

    const userResult: IUser | null = await UserModel.findByIdAndUpdate(picture._id, { picture: uploadResult?.secure_url }, { new: true });

    return {
      user: userResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
