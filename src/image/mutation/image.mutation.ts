import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

import { AdminAPI, assetsUploadOptions, uploadImage } from '../../../cloud';
import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { getImageUnique, isAuthorized } from '../../utils/functions';
import { serverError, unauthorized } from '../../utils/values';

import { ImageModel } from '../model';
import { IImage, IImageInput, IImageSuccess } from '../schema';

export const image = async (_: object, args: { image: IImageInput }, ctx: IContext): Promise<IImageSuccess | IError> => {
  try {
    const { image } = args;
    const { session } = ctx;
    const authorized: boolean = await isAuthorized(session);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action.');
    }

    const uploadResult: UploadApiErrorResponse | UploadApiResponse = await uploadImage(image.image.file, assetsUploadOptions);
    let imageResult: IImage | null;

    if (image._id) {
      const updateQuery: IImageInput = image;

      if (image.url) {
        const unique = getImageUnique(image.url, assetsUploadOptions.folder);

        await AdminAPI.delete_resources([unique]);
        updateQuery.url = uploadResult?.secure_url;
      }

      imageResult = await ImageModel.findByIdAndUpdate(image._id, updateQuery, { new: true });
    } else {
      imageResult = await ImageModel.create({ ...image, url: uploadResult?.secure_url });
    }

    return {
      image: imageResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later.');
  }
};
