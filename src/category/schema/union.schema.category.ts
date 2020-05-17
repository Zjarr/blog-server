import { gql } from 'apollo-server-express';

import { Pagination } from '../../pagination/schema';

import { Category } from './base.schema.category';

export interface CategoriesSuccess {
  categories: Category[];
  pagination: Pagination;
}
export interface CategorySuccess {
  category: Category;
}

export const UnionSchemaCategory = gql`
  union CategoriesPayload = CategoriesSuccess | Error
  union CategoryPayload = CategorySuccess | Error

  type CategoriesSuccess {
    categories: [ Category ]
    pagination: Pagination!
  }

  type CategorySuccess {
    category: Category
  }
`;
