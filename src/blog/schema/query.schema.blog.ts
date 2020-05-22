import { gql } from 'apollo-server-express';

import { IPaginationInput } from '../../pagination/schema';

export interface IGetBlogInput {
  _id?: string;
  slug?: string;
}

export interface IGetBlogsInput {
  active?: boolean;
  after?: string;
  author?: string;
  before?: string;
  categories?: string[];
  keywords?: string[];
  pagination: IPaginationInput;
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
