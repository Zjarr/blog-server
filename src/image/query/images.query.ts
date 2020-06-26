import { Document, PaginateResult } from 'mongoose';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized, paginationResult } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { IPagination } from '../../pagination/schema';
import { IPermission } from '../../role/schema';

import { ImageModel } from '../model';
import { IGetImagesInput, IImage, IImagesSuccess } from '../schema';

interface ISearchQuery {
  active?: boolean;
}

const createSearchQuery = (query: IGetImagesInput): ISearchQuery => {
  const searchQuery: ISearchQuery = { };
  const { active } = query;

  if (active) {
    searchQuery.active = active;
  }

  return searchQuery;
};

export const images = async (_: object, args: { images: IGetImagesInput }, ctx: IContext): Promise<IImagesSuccess | IError> => {
  try {
    const { session } = ctx;
    const authorized = await isAuthorized(session, IPermission.VIEW_ASSET);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
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
    return serverError('There was an error with this request. Please try again later');
  }
};
