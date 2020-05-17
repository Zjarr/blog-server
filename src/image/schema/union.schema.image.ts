import { gql } from 'apollo-server-express';

import { Pagination } from '../../pagination/schema';

import { Image } from './base.schema.image';

export interface ImageSuccess {
  image: Image;
}

export interface ImagesSuccess {
  images: Image[];
  pagination: Pagination;
}

export const UnionSchemaImage = gql`
  union ImagePayload = ImageSuccess | Error
  union ImagesPayload = ImagesSuccess | Error

  type ImageSuccess {
    image: Image
  }

  type ImagesSuccess {
    images: [ Image ]
    pagination: Pagination!
  }
`;
