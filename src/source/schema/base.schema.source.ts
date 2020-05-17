import { gql } from 'apollo-server-express';

export interface Source {
  name: string;
  url: string;
}

export const BaseSchemaSource = gql`
  type Source {
    name: String!
    url: String!
  }
`;
