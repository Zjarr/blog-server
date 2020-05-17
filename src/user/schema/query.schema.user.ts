import { gql } from 'apollo-server-express';

import { PaginationInput } from '../../pagination/schema';

export interface GetUserInput {
  _id?: string;
  email?: string;
}

export interface GetUsersInput {
  active?: boolean;
  pagination: PaginationInput;
}

export const QuerySchemaUser = gql`
  input GetUserInput {
    _id: String
    email: String
  }

  input GetUsersInput {
    active: Boolean
    pagination: PaginationInput!
  }

  extend type Query {
    user(user: GetUserInput!): UserPayload!
    users(users: GetUsersInput!): UsersPayload!
  }
`;
