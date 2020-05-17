import { gql } from 'apollo-server-express';

export interface Image {
  active: boolean;
  alt: string;
  description?: string;
  name: string;
  url: string;
}

export const BaseSchemaImage = gql`
  type Image {
    active: Boolean!
    alt: String!
    description: String
    name: String!
    url: String!
  }
`;
