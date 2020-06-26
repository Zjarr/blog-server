import { gql } from 'apollo-server-express';

interface IErrorDetails {
  code: number;
  message?: string;
  status: string;
}

export interface IError {
  error: IErrorDetails;
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
