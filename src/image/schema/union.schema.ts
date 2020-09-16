import { gql } from 'apollo-server-express';

import { IPagination } from '../../pagination/schema';

import { IImage } from './image.schema';

interface IImagesCount {
  count: number;
}

export interface IImageSuccess {
  image: IImage | null;
}

export interface IImagesSuccess {
  images: IImage[];
  pagination: IPagination;
}

export interface IImagesAmountSuccess {
  images: IImagesCount;
}

export const UnionSchemaImage = gql`
  union ImagePayload = ImageSuccess | Error
  union ImagesPayload = ImagesSuccess | Error
  union ImagesAmountPayload = ImagesAmountSuccess | Error

  type ImagesCount {
    count: Int!
  }

  type ImageSuccess {
    image: Image
  }

  type ImagesSuccess {
    images: [ Image ]
    pagination: Pagination!
  }

  type ImagesAmountSuccess {
    images: ImagesCount!
  }
`;
