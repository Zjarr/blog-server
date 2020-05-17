import { Document, model, PaginateModel, Schema } from 'mongoose';
import MongoosePaginate from 'mongoose-paginate-v2';

import { Permission, Role } from '../../role/schema';

export const RoleSchema = new Schema({
  active: {
    default: true,
    required: true,
    type: Boolean
  },

  description: {
    required: true,
    type: String
  },

  name: {
    required: true,
    type: String,
    unique: true
  },

  permissions: [{
    enum: [
      Permission.CREATE_ASSET,
      Permission.CREATE_BLOG,
      Permission.CREATE_CATEGORY,
      Permission.CREATE_ROLE,
      Permission.CREATE_USER,
      Permission.UPDATE_ASSET,
      Permission.UPDATE_BLOG,
      Permission.UPDATE_CATEGORY,
      Permission.UPDATE_ROLE,
      Permission.UPDATE_USER,
      Permission.VIEW_ASSET,
      Permission.VIEW_ROLE,
      Permission.VIEW_USER
    ],
    required: true,
    type: String
  }]
});

RoleSchema.plugin(MongoosePaginate);

interface RoleModel<T extends Document> extends PaginateModel<T> {};

export const RoleModel = model<Role & Document>('Role', RoleSchema) as RoleModel<Role & Document>;
