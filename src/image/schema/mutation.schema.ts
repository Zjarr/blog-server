import { gql } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

export interface IImageImageInput {
  file: FileUpload;
  remove: boolean;
}

export interface IImageInput {
  _id?: string;
  active: boolean;
  alt: string;
  description?: string;
  image: IImageImageInput;
  name: string;
  url?: string;
}

export const MutationSchemaImage = gql`
  input ImageImageInput {
    file: Upload!
    remove: Boolean!
  }

  input ImageInput {
    _id: String
    active: Boolean!
    alt: String!
    description: String
    image: ImageImageInput!
    name: String!
    url: String
  }

  extend type Mutation {
    image(image: ImageInput!): ImagePayload!
  }
`;
