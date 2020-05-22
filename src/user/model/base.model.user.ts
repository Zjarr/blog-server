import { Document, model, PaginateModel, Schema } from 'mongoose';
import MongoosePaginate from 'mongoose-paginate-v2';

import { SocialSchema } from '../../social/model';

import { IUser } from '../schema';

export const UserSchema = new Schema({
  about: {
    required: false,
    type: String
  },

  active: {
    default: true,
    required: true,
    type: Boolean
  },

  created: {
    required: true,
    type: String
  },

  email: {
    required: true,
    type: String,
    unique: true
  },

  lastname: {
    required: true,
    type: String
  },

  name: {
    required: true,
    type: String
  },

  password: {
    required: true,
    type: String
  },

  picture: {
    required: false,
    type: String
  },

  role: {
    ref: 'role',
    required: true,
    type: Schema.Types.ObjectId,
  },

  social: [{
    required: false,
    type: SocialSchema
  }]
});

UserSchema.plugin(MongoosePaginate);

interface IUserModel<T extends Document> extends PaginateModel<T> {};

export const UserModel = model<IUser & Document>('user', UserSchema) as IUserModel<IUser & Document>;
