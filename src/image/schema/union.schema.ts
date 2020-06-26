import { gql } from 'apollo-server-express';

import { IPagination } from '../../pagination/schema';

import { IImage } from './image.schema';

export interface IImageSuccess {
  image: IImage | null;
}

export interface IImagesSuccess {
  images: IImage[];
  pagination: IPagination;
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
