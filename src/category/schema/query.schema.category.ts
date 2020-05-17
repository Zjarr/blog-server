import { gql } from 'apollo-server-express';

import { PaginationInput } from '../../pagination/schema';

export interface GetCategoriesInput {
  active?: boolean;
  pagination: PaginationInput;
}

export interface GetCategoryInput {
  _id?: string;
  name?: string;
}

export const QuerySchemaCategory = gql`
  input GetCategoriesInput {
    active: Boolean
    pagination: PaginationInput!
  }

  input GetCategoryInput {
    _id: String
    name: String
  }

  extend type Query {
    categories(categories: GetCategoriesInput!): CategoriesPayload!
    category(category: GetCategoryInput!): CategoryPayload!
  }
`;
