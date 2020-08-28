import { gql } from 'apollo-server-express';

import { IPaginationInput } from '../../pagination/schema';

export interface IGetImageInput {
  _id?: string;
}

export interface IGetImagesInput {
  active?: boolean;
  name?: string;
  pagination?: IPaginationInput;
}

export const QuerySchemaImage = gql`
  input GetImageInput {
    _id: String
  }

  input GetImagesInput {
    active: Boolean
    name: String
    pagination: PaginationInput
  }

  extend type Query {
    image(image: GetImageInput!): ImagePayload!
    images(images: GetImagesInput!): ImagesPayload!
  }
`;
