import { gql } from 'apollo-server-express';

export interface IGetUserInput {
  _id?: string;
}

export const QuerySchemaUser = gql`
  input GetUserInput {
    _id: String
  }

  extend type Query {
    user(user: GetUserInput!): UserPayload!
  }
`;
