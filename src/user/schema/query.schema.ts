import { gql } from 'apollo-server-express';

export interface IGetUserInput {
  _id?: string;
  email?: string;
}

export const QuerySchemaUser = gql`
  input GetUserInput {
    _id: String
    email: String
  }

  extend type Query {
    user(user: GetUserInput!): UserPayload!
  }
`;
