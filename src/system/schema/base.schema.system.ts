import { gql } from 'apollo-server-express';

export interface System {
  version: string;
}

export const BaseSchemaSystem = gql`
  type System {
    version: String!
  }
`;
