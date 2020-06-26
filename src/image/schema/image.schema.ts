import { gql } from 'apollo-server-express';

export interface IImage {
  _id?: string;
  active: boolean;
  alt: string;
  description?: string;
  name: string;
  url: string;
}

export const BaseSchemaImage = gql`
  type Image {
    _id: String
    active: Boolean!
    alt: String!
    description: String
    name: String!
    url: String!
  }
`;
