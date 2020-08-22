import { gql } from 'apollo-server-express';

import { IPaginationInput } from '../../pagination/schema';

export interface IGetImageInput {
  _id?: string;
  url?: string;
}

export interface IGetImagesInput {
  active?: boolean;
  pagination: IPaginationInput;
}

export const QuerySchemaImage = gql`
  input GetImageInput {
    _id: String
    name: String
  }

  input GetImagesInput {
    active: Boolean
    pagination: PaginationInput!
  }

  extend type Query {
    image(image: GetImageInput!): ImagePayload!
    images(images: GetImagesInput!): ImagesPayload!
  }
`;
