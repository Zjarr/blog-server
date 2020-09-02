import { Document, model, PaginateModel, Schema } from 'mongoose';
import MongoosePaginate from 'mongoose-paginate-v2';

import { SocialSchema } from '../../social/model';

import { IUser } from '../schema';

export const UserSchema = new Schema({
  about: {
    required: false,
    type: String
  },

  created: {
    required: true,
    type: Date
  },

  email: {
    required: true,
    type: String,
    unique: true
  },

  firstname: {
    required: true,
    type: String
  },

  image: {
    required: false,
    type: String
  },

  lastname: {
    required: true,
    type: String
  },

  password: {
    required: true,
    type: String
  },

  social: [{
    required: false,
    type: SocialSchema
  }]
});

UserSchema.plugin(MongoosePaginate);

interface IUserModel<T extends Document> extends PaginateModel<T> { };

export const UserModel = model<IUser & Document>('user', UserSchema) as IUserModel<IUser & Document>;
