import { gql } from 'apollo-server-express';

import { PaginationInput } from '../../pagination/schema';

export interface GetImageInput {
  _id?: string;
  url?: string;
}

export interface GetImagesInput {
  active?: boolean;
  after?: string;
  before?: string;
  pagination: PaginationInput;
}

export const QuerySchemaImage = gql`
  input GetImageInput {
    _id: String
    name: String
  }

  input GetImagesInput {
    active: Boolean
    after: String
    before: String
    pagination: PaginationInput!
  }

  extend type Query {
    image(image: GetImageInput!): ImagePayload!
    images(images: GetImagesInput!): ImagesPayload!
  }
`;
