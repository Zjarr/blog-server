import { gql } from 'apollo-server-express';

export interface IImageInput {
  _id?: string;
  active: boolean;
  alt: string;
  description?: string;
  name: string;
  url?: string;
}

export const MutationSchemaImage = gql`
  input ImageInput {
    _id: String
    active: Boolean!
    alt: String!
    description: String
    name: String!
    url: String
  }

  extend type Mutation {
    image(file: Upload!, image: ImageInput!): ImagePayload!
  }
`;
