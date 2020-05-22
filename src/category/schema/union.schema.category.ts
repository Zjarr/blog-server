import { gql } from 'apollo-server-express';

import { IPagination } from '../../pagination/schema';

import { ICategory } from './base.schema.category';

export interface ICategoriesSuccess {
  categories: ICategory[];
  pagination: IPagination;
}
export interface ICategorySuccess {
  category: ICategory;
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
