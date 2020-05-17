import { gql } from 'apollo-server-express';

export interface ImageInput {
  _id?: string;
  active: boolean;
  alt: string;
  base64?: string;
  description?: string;
  name: string;
  url?: string;
}

export const MutationSchemaImage = gql`
  input ImageInput {
    _id: String
    active: Boolean!
    alt: String!
    base64: String
    description: String
    name: String!
    url: String
  }

  extend type Mutation {
    image(image: ImageInput!): ImagePayload!
  }
`;
