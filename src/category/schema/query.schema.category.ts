import { gql } from 'apollo-server-express';

import { IPaginationInput } from '../../pagination/schema';

export interface IGetCategoriesInput {
  active?: boolean;
  pagination: IPaginationInput;
}

export interface IGetCategoryInput {
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
