import { gql } from 'apollo-server-express';

interface IPaginationSortInput {
  name?: number;
  updated?: number;
}

export interface IPaginationInput {
  limit: number;
  page: number;
  sort: IPaginationSortInput;
}

export interface IPagination {
  limit: number;
  next: boolean;
  page: number | undefined;
  prev: boolean;
  total: number;
}

export const BaseSchemaPagination = gql`
  input PaginationSortInput {
    name: Int
    updated: Int
  }

  input PaginationInput {
    limit: Int!
    page: Int!
    sort: PaginationSortInput!
  }

  type Pagination {
    limit: Int!
    next: Boolean!
    page: Int!
    prev: Boolean!
    total: Int!
  }
`;
