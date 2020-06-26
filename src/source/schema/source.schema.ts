import { gql } from 'apollo-server-express';

export interface ISource {
  _id?: string;
  name: string;
  url: string;
}

export const BaseSchemaSource = gql`
  type Source {
    _id: String
    name: String!
    url: String!
  }
`;
