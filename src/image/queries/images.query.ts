import { Document, PaginateResult } from 'mongoose';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { IPagination } from '../../pagination/schema';
import { isAuthorized, paginationResult } from '../../utils/functions';
import { serverError, unauthorized } from '../../utils/values';

import { ImageModel } from '../model';
import { IGetImagesInput, IImage, IImagesSuccess } from '../schema';

interface ISearchQuery {
  active?: boolean;
  name?: {
    $regex: RegExp;
  };
}

const createSearchQuery = (query: IGetImagesInput): ISearchQuery => {
  const searchQuery: ISearchQuery = {};
  const { active, name } = query;

  if (active !== undefined) {
    searchQuery.active = active;
  }

  if (name) {
    searchQuery.name = {
      $regex: new RegExp(`${name}`, 'i')
    };
  }

  return searchQuery;
};

export const images = async (_: object, args: { images: IGetImagesInput }, ctx: IContext): Promise<IImagesSuccess | IError> => {
  try {
    const { session } = ctx;
    const authorized = await isAuthorized(session);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action.');
    }

    const { images } = args;
    const searchQuery = createSearchQuery(images);
    const imagesFound: PaginateResult<IImage & Document> = await ImageModel.paginate(searchQuery, { ...images.pagination });
    const pagination: IPagination = paginationResult(imagesFound);

    return {
      images: imagesFound.docs,
      pagination
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later.');
  }
};
