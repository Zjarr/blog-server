import Cloudinary, { UploadApiOptions } from 'cloudinary';

import { Env } from '../../../env';

const defaultUploadOptions: UploadApiOptions = {
  access_mode: 'authenticated',
  unique_filename: true
};

export const assetsUploadOptions: UploadApiOptions = {
  ...defaultUploadOptions,
  folder: `${Env.NODE_ENV}/assets`
};

export const usersUploadOptions: UploadApiOptions = {
  ...defaultUploadOptions,
  folder: `${Env.NODE_ENV}/users`
};

Cloudinary.v2.config({
  api_key: Env.CLOUDINARY_API_KEY,
  api_secret: Env.CLOUDINARY_SECRET,
  cloud_name: Env.CLOUDINARY_NAME,
});

export const AdminAPI = Cloudinary.v2.api;
export const ImageUploader = Cloudinary.v2.uploader;
