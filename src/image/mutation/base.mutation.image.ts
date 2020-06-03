import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { FileUpload } from 'graphql-upload';

import { AdminAPI, assetsUploadOptions, uploadImage } from '../../../cloud';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { getImageUnique, isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { IPermission } from '../../role/schema';

import { ImageModel } from '../model';
import { IImage, IImageInput, IImageSuccess } from '../schema';

export const image = async (_: object, args: { file: FileUpload, image: IImageInput }, ctx: IContext): Promise<IImageSuccess | IError> => {
  try {
    const { file, image } = args;
    const { session } = ctx;
    let authorized: boolean;

    if (image._id) {
      authorized = await isAuthorized(session, IPermission.UPDATE_ASSET);
    } else {
      authorized = await isAuthorized(session, IPermission.CREATE_ASSET);
    }

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    let imageResult: IImage;
    let uploadResult: UploadApiErrorResponse | UploadApiResponse;

    if (file) {
      uploadResult = await uploadImage(file, assetsUploadOptions);
    }

    if (image._id) {
      const updateQuery: IImageInput = image;

      if (image.url) {
        const unique = getImageUnique(image.url, assetsUploadOptions.folder);

        await AdminAPI.delete_resources([unique]);
        updateQuery.url = uploadResult.secure_url;
      }

      imageResult = await ImageModel.findByIdAndUpdate(image._id, updateQuery, { new: true });
    } else {
      imageResult = await ImageModel.create({ ...image, url: uploadResult.secure_url });
    }

    return {
      image: imageResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
