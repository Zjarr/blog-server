import { gql } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

export interface IImageInput {
  _id?: string;
  active: boolean;
  alt: string;
  description?: string;
  file?: FileUpload;
  name: string;
  url?: string;
}

export const MutationSchemaImage = gql`
  input ImageInput {
    _id: String
    active: Boolean!
    alt: String!
    description: String
    file: Upload
    name: String!
    url: String
  }

  extend type Mutation {
    image(image: ImageInput!): ImagePayload!
  }
`;
