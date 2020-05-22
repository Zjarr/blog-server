import { Document, model, PaginateModel, Schema } from 'mongoose';
import MongoosePaginate from 'mongoose-paginate-v2';

import { SourceSchema } from '../../source/model';

import { IBlog } from '../schema';

export const BlogSchema = new Schema({
  active: {
    default: true,
    required: true,
    type: Boolean
  },

  author: {
    required: true,
    type: String
  },

  body: {
    required: true,
    type: String
  },

  categories: [{
    ref: 'category',
    required: false,
    type: Schema.Types.ObjectId
  }],

  collaborators: [{
    required: false,
    ref: 'user',
    type: Schema.Types.ObjectId
  }],

  created: {
    required: true,
    type: String
  },

  description: {
    required: true,
    type: String
  },

  keywords: [{
    required: false,
    type: String
  }],

  slug: {
    required: true,
    type: String,
    unique: true
  },

  sources: [{
    required: false,
    type: SourceSchema
  }],

  title: {
    required: true,
    type: String
  },

  updated: {
    required: true,
    type: String
  }
});

BlogSchema.plugin(MongoosePaginate);

interface IBlogModel<T extends Document> extends PaginateModel<T> {};

export const BlogModel = model<IBlog & Document>('blog', BlogSchema) as IBlogModel<IBlog & Document>;
