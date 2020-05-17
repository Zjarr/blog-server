import { gql } from 'apollo-server-express';

interface ErrorDetails {
  code: number;
  message?: string;
  status: string;
}

export interface Error {
  error: ErrorDetails;
}

export const BaseSchemaError = gql`
  type ErrorDetails {
    code: Int!
    message: String
    status: String!
  }

  type Error {
    error: ErrorDetails!
  }
`;
