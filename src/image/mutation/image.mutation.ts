import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

import { AdminAPI, assetsUploadOptions, uploadImage } from '../../../cloud';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { getImageUnique, isAuthorized } from '../../utils/functions';
import { badRequest, serverError, unauthorized } from '../../utils/values';

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

    const imageFound: IImage | null = await ImageModel.findOne({ _id: image._id });
    let uploadResult: UploadApiErrorResponse | UploadApiResponse | null = null;
    let imageResult: IImage | null;

    if (!image.url && !image.file) {
      return badRequest(`Image's url or file params are missing.`);
    }

    if (image.file) {
      uploadResult = await uploadImage(image.file, assetsUploadOptions);
      image.url = uploadResult?.secure_url;
    }

    if (image.file && imageFound?.url) {
      const unique = getImageUnique(imageFound.url, assetsUploadOptions.folder);

      await AdminAPI.delete_resources([unique]);
    }

    if (image._id) {
      imageResult = await ImageModel.findByIdAndUpdate(image._id, { ...image }, { new: true });
    } else {
      imageResult = await ImageModel.create({ ...image, url: image.url! });
    }

    return {
      image: imageResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later.');
  }
};
