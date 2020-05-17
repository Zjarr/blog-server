import { gql } from 'apollo-server-express';

export interface PaginationInput {
  limit: number;
  page: number;
}

export interface Pagination {
  limit: number;
  next: boolean;
  page: number;
  prev: boolean;
  total: number;
}

export const BaseSchemaPagination = gql`
  input PaginationInput {
    limit: Int!
    page: Int!
  }

  type Pagination {
    limit: Int!
    next: Boolean!
    page: Int!
    prev: Boolean!
    total: Int!
  }
`;
