import { Document, model, PaginateModel, Schema } from 'mongoose';
import MongoosePaginate from 'mongoose-paginate-v2';

import { Category } from '../../category/schema';

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

interface CategoryModel<T extends Document> extends PaginateModel<T> {};

export const CategoryModel = model<Category & Document>('Category', CategorySchema) as CategoryModel<Category & Document>;
