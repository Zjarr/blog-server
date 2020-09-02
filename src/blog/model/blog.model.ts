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

  body: {
    required: true,
    type: String
  },

  categories: [{
    ref: 'category',
    required: false,
    type: Schema.Types.ObjectId
  }],

  created: {
    required: true,
    type: Date
  },

  description: {
    required: true,
    type: String
  },

  image: {
    required: true,
    type: String
  },

  name: {
    required: true,
    type: String
  },

  slug: {
    required: true,
    type: String,
    unique: true
  },

  sources: [{
    required: false,
    type: SourceSchema
  }],

  updated: {
    required: true,
    type: Date
  }
});

BlogSchema.plugin(MongoosePaginate);

interface IBlogModel<T extends Document> extends PaginateModel<T> { };

export const BlogModel = model<IBlog & Document>('blog', BlogSchema) as IBlogModel<IBlog & Document>;
