import { gql } from 'apollo-server-express';

import { PaginationInput } from '../../pagination/schema';

export interface GetBlogInput {
  _id?: string;
  slug?: string;
}

export interface GetBlogsInput {
  active?: boolean;
  after?: string;
  author?: string;
  before?: string;
  categories?: string[];
  keywords?: string[];
  pagination: PaginationInput;
}

export const QuerySchemaBlog = gql`
  input GetBlogInput {
    _id: String
    slug: String
  }

  input GetBlogsInput {
    active: Boolean
    after: String
    author: String
    before: String
    categories: [String]
    keywords: [String]
    pagination: PaginationInput!
  }

  extend type Query {
    blog(blog: GetBlogInput!): BlogPayload!
    blogs(blogs: GetBlogsInput!): BlogsPayload!
  }
`;
