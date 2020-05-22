import { gql } from 'apollo-server-express';

import { IPaginationInput } from '../../pagination/schema';

export interface IGetUserInput {
  _id?: string;
  email?: string;
}

export interface IGetUsersInput {
  active?: boolean;
  pagination: IPaginationInput;
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
