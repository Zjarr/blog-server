import { Document, PaginateResult } from 'mongoose';

import { Context } from '../../context';
import { Error } from '../../error/schema';
import { isAuthorized, paginationResult } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { Pagination } from '../../pagination/schema';
import { Permission } from '../../role/schema';

import { ImageModel } from '../model';
import { GetImagesInput, Image, ImagesSuccess } from '../schema';

interface SearchQuery {
  active?: boolean;
}

const createSearchQuery = (query: GetImagesInput): SearchQuery => {
  const searchQuery: SearchQuery = { };
  const { active } = query;

  if (active) {
    searchQuery.active = active;
  }

  return searchQuery;
};

export const images = async (_: object, args: { images: GetImagesInput }, ctx: Context): Promise<ImagesSuccess | Error> => {
  try {
    const { session } = ctx;
    const authorized = await isAuthorized(session, Permission.VIEW_ASSET);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const { images } = args;
    const searchQuery = createSearchQuery(images);
    const imagesFound: PaginateResult<Image & Document> = await ImageModel.paginate(searchQuery, { ...images.pagination });
    const pagination: Pagination = paginationResult(imagesFound);

    return {
      images: imagesFound.docs,
      pagination
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
