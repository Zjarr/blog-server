import { UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from 'cloudinary';
import { FileUpload } from 'graphql-upload';

import { ImageUploader } from '.';

export const uploadImage = async (file: FileUpload, options: UploadApiOptions): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  const { createReadStream } = await file;
  const fileStream = createReadStream();

  return new Promise((resolve, reject) => {
    const cloudStream = ImageUploader.upload_stream(options, (error, fileUploaded) => {
      if (error) {
        return reject(error);
      }

      return resolve(fileUploaded);
    });

    fileStream.pipe(cloudStream);
  });
};
