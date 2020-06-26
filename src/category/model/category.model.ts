import { Document, model, PaginateModel, Schema } from 'mongoose';
import MongoosePaginate from 'mongoose-paginate-v2';

import { ICategory } from '../schema';

export const CategorySchema = new Schema({
  active: {
    default: true,
    required: true,
    type: Boolean
  },

  description: {
    required: false,
    type: String
  },

  icon: {
    required: true,
    type: String
  },

  name: {
    required: true,
    type: String,
    unique: true
  }
});

CategorySchema.plugin(MongoosePaginate);

interface ICategoryModel<T extends Document> extends PaginateModel<T> {};

export const CategoryModel = model<ICategory & Document>('Category', CategorySchema) as ICategoryModel<ICategory & Document>;
