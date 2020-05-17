import { makeExecutableSchema } from 'apollo-server-express';

import { blog as BlogMutation } from './blog/mutation';
import { blog as BlogQuery, blogs as BlogsQuery } from './blog/query';
import {
  BaseSchemaBlog,
  MutationSchemaBlog,
  QuerySchemaBlog,
  UnionSchemaBlog
} from './blog/schema';
import { BlogPayload, BlogsPayload } from './blog/union';

import { category as CategoryMutation } from './category/mutation';
import { categories as CategoriesQuery, category as CategoryQuery } from './category/query';
import {
  BaseSchemaCategory,
  MutationSchemaCategory,
  QuerySchemaCategory,
  UnionSchemaCategory
} from './category/schema';
import { CategoriesPayload, CategoryPayload } from './category/union';

import {
  BaseSchemaError
} from './error/schema';

import { image as ImageMutation } from './image/mutation';
import { image as ImageQuery, images as ImagesQuery } from './image/query';
import {
  BaseSchemaImage,
  MutationSchemaImage,
  QuerySchemaImage,
  UnionSchemaImage
} from './image/schema';
import { ImagePayload, ImagesPayload } from './image/union';

import {
  BaseSchemaMutation
} from './mutation/schema';

import {
  BaseSchemaPagination
} from './pagination/schema';

import {
  BaseSchemaQuery
} from './query/schema';

import { role as RoleMutation } from './role/mutation';
import { role as RoleQuery, roles as RolesQuery } from './role/query';
import {
  BaseSchemaRole,
  MutationSchemaRole,
  QuerySchemaRole,
  UnionSchemaRole
} from './role/schema';
import { RolePayload, RolesPayload } from './role/union';

import {
  BaseSchemaSocial
} from './social/schema';

import {
  BaseSchemaSource
} from './source/schema';

import {
  BaseSchemaSystem,
  QuerySchemaSystem
} from './system/schema';
import { system as SystemQuery } from './system/query';

import { login as LoginMutation, password as PasswordMutation, picture as PictureMutation, user as UserMutation } from './user/mutation';
import { user as UserQuery, users as UsersQuery } from './user/query';
import {
  BaseSchemaUser,
  MutationSchemaUser,
  QuerySchemaUser,
  UnionSchemaUser
} from './user/schema';
import { LoginPayload, UserPayload, UsersPayload } from './user/union';

const Mutation = {
  blog: BlogMutation,
  category: CategoryMutation,
  image: ImageMutation,
  login: LoginMutation,
  password: PasswordMutation,
  picture: PictureMutation,
  role: RoleMutation,
  user: UserMutation
};

const Query = {
  blog: BlogQuery,
  blogs: BlogsQuery,
  categories: CategoriesQuery,
  category: CategoryQuery,
  image: ImageQuery,
  images: ImagesQuery,
  role: RoleQuery,
  roles: RolesQuery,
  system: SystemQuery,
  user: UserQuery,
  users: UsersQuery
};

const schemas = [
  BaseSchemaBlog,
  BaseSchemaCategory,
  BaseSchemaError,
  BaseSchemaImage,
  BaseSchemaMutation,
  BaseSchemaPagination,
  BaseSchemaRole,
  BaseSchemaSocial,
  BaseSchemaSource,
  BaseSchemaSystem,
  BaseSchemaUser,

  MutationSchemaBlog,
  MutationSchemaCategory,
  MutationSchemaImage,
  MutationSchemaRole,
  MutationSchemaUser,

  QuerySchemaBlog,
  QuerySchemaCategory,
  BaseSchemaQuery,
  QuerySchemaImage,
  QuerySchemaRole,
  QuerySchemaSystem,
  QuerySchemaUser,

  UnionSchemaBlog,
  UnionSchemaCategory,
  UnionSchemaImage,
  UnionSchemaRole,
  UnionSchemaUser
];

const Union = {
  BlogPayload,
  BlogsPayload,
  CategoriesPayload,
  CategoryPayload,
  ImagePayload,
  ImagesPayload,
  LoginPayload,
  RolePayload,
  RolesPayload,
  UserPayload,
  UsersPayload
};

const resolvers = {
  Mutation,
  Query,
  ...Union
};

import { Env } from '../env';
import { context } from './context';

const executableSchema = makeExecutableSchema({ typeDefs: schemas, resolvers });
const playground = Env.PLAYGROUND === 'true' ? true : false;

export const config = {
  context,
  playground,
  schema: executableSchema
};
