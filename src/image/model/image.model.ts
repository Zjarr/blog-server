import { Document, model, PaginateModel, Schema } from 'mongoose';
import MongoosePaginate from 'mongoose-paginate-v2';

import { IImage } from '../schema';

export const ImageSchema = new Schema({
  active: {
    default: true,
    required: true,
    type: Boolean
  },

  alt: {
    required: true,
    type: String
  },

  description: {
    required: false,
    type: String
  },

  name: {
    required: true,
    type: String
  },

  url: {
    required: true,
    type: String,
    unique: true
  }
});

ImageSchema.plugin(MongoosePaginate);

interface IImageModel<T extends Document> extends PaginateModel<T> {};

export const ImageModel = model<IImage & Document>('Image', ImageSchema) as IImageModel<IImage & Document>;
