import { gql } from 'apollo-server-express';

import { IPaginationInput } from '../../pagination/schema';

export interface IGetBlogInput {
  _id?: string;
  slug?: string;
}

export interface IGetBlogsInput {
  active?: boolean;
  after?: string;
  before?: string;
  categories?: string[];
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
    before: String
    categories: [String]
    pagination: PaginationInput!
  }

  extend type Query {
    blog(blog: GetBlogInput!): BlogPayload!
    blogs(blogs: GetBlogsInput!): BlogsPayload!
  }
`;
