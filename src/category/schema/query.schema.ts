import { gql } from 'apollo-server-express';

import { IPaginationInput } from '../../pagination/schema';

export interface IGetCategoriesInput {
  active?: boolean;
  name?: string;
  pagination?: IPaginationInput;
}

export interface IGetCategoryInput {
  _id?: string;
}

export const QuerySchemaCategory = gql`
  input GetCategoriesInput {
    active: Boolean
    name: String
    pagination: PaginationInput
  }

  input GetCategoryInput {
    _id: String
  }

  extend type Query {
    categories(categories: GetCategoriesInput!): CategoriesPayload!
    category(category: GetCategoryInput!): CategoryPayload!
  }
`;
