import { Document, model, PaginateModel, Schema } from 'mongoose';
import MongoosePaginate from 'mongoose-paginate-v2';

import { IPermission, IRole } from '../../role/schema';

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
      IPermission.CREATE_ASSET,
      IPermission.CREATE_BLOG,
      IPermission.CREATE_CATEGORY,
      IPermission.CREATE_ROLE,
      IPermission.CREATE_USER,
      IPermission.UPDATE_ASSET,
      IPermission.UPDATE_BLOG,
      IPermission.UPDATE_CATEGORY,
      IPermission.UPDATE_ROLE,
      IPermission.UPDATE_USER,
      IPermission.VIEW_ASSET,
      IPermission.VIEW_ROLE,
      IPermission.VIEW_USER
    ],
    required: true,
    type: String
  }]
});

RoleSchema.plugin(MongoosePaginate);

interface IRoleModel<T extends Document> extends PaginateModel<T> {};

export const RoleModel = model<IRole & Document>('Role', RoleSchema) as IRoleModel<IRole & Document>;
