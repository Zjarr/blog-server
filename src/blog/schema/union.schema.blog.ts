import { gql } from 'apollo-server-express';

import { IPagination } from '../../pagination/schema';

import { IBlog } from './base.schema.blog';

export interface IBlogSuccess {
  blog: IBlog | null;
}

export interface IBlogsSuccess {
  blogs: IBlog[];
  pagination: IPagination;
}

export const UnionSchemaBlog = gql`
  union BlogPayload = BlogSuccess | Error
  union BlogsPayload = BlogsSuccess | Error

  type BlogSuccess {
    blog: Blog
  }

  type BlogsSuccess {
    blogs: [ Blog ]
    pagination: Pagination!
  }
`;
