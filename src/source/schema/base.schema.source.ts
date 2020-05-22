import { gql } from 'apollo-server-express';

export interface ISource {
  name: string;
  url: string;
}

export const BaseSchemaSource = gql`
  type Source {
    name: String!
    url: String!
  }
`;
