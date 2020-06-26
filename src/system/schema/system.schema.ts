import { gql } from 'apollo-server-express';

export interface ISystem {
  version: string;
}

export const BaseSchemaSystem = gql`
  type System {
    version: String!
  }
`;
