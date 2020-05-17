import { gql } from 'apollo-server-express';

import { Pagination } from '../../pagination/schema';

import { Blog } from './base.schema.blog';

export interface BlogSuccess {
  blog: Blog;
}

export interface BlogsSuccess {
  blogs: Blog[];
  pagination: Pagination;
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
