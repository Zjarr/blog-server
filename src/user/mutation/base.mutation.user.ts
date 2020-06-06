import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { FileUpload } from 'graphql-upload';
import Moment from 'moment';

import { uploadImage, usersUploadOptions } from '../../../cloud';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { encrypt, isAuthorized } from '../../lib/functions';
import { conflict, serverError, unauthorized } from '../../lib/values';
import { IPermission } from '../../role/schema';

import { UserModel } from '../model';
import { IUser, IUserInput, IUserSuccess } from '../schema';

export const user = async (_: object, args: { file: FileUpload, user: IUserInput }, ctx: IContext): Promise<IUserSuccess | IError> => {
  try {
    const { file, user } = args;
    const { session } = ctx;
    let authorized: boolean;

    if (user._id) {
      authorized = await isAuthorized(session, IPermission.UPDATE_USER, user._id);
    } else {
      authorized = await isAuthorized(session, IPermission.CREATE_USER);
    }

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const userFound: IUser = await UserModel.findOne({ email: user.email });

    if (!user._id && userFound) {
      return conflict('Already exists an user with the provided email');
    }

    let picture: string;
    let uploadResult: UploadApiErrorResponse | UploadApiResponse;
    let userResult: IUser;

    if (file) {
      uploadResult = await uploadImage(file, usersUploadOptions);
      picture = uploadResult.secure_url;
    }

    if (user._id) {
      delete user.password;

      userResult = await UserModel.findByIdAndUpdate(user._id, { ...user }, { new: true });
    } else {
      const created = Moment().utc().format('YYYY-MM-DDTHH:mm:ss');

      user.password = encrypt(user.password);
      userResult = await UserModel.create({ ...user, created, picture });
    }

    return {
      user: userResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
