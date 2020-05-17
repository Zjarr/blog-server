import { Document, model, PaginateModel, Schema } from 'mongoose';
import MongoosePaginate from 'mongoose-paginate-v2';

import { Image } from '../../image/schema';

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

interface ImageModel<T extends Document> extends PaginateModel<T> {};

export const ImageModel = model<Image & Document>('Image', ImageSchema) as ImageModel<Image & Document>;
