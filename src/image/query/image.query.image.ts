import { Logger } from '../../../logger';

import { Context } from '../../context';
import { Error } from '../../error/schema';
import { isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { Permission } from '../../role/schema';

import { ImageModel } from '../model';
import { GetImageInput, Image, ImageSuccess } from '../schema';

interface SearchQuery {
  _id?: string;
  url?: string;
}

const createSearchQuery = (query: GetImageInput): SearchQuery => {
  const searchQuery: SearchQuery = { };
  const { _id, url } = query;

  if (_id) {
    searchQuery._id = _id;
  }

  if (url) {
    searchQuery.url = url;
  }

  return searchQuery;
};

export const image = async (_: object, args: { image: GetImageInput }, ctx: Context): Promise<ImageSuccess | Error> => {
  try {
    const { session } = ctx;
    const authorized = await isAuthorized(session, Permission.VIEW_ASSET);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const { image } = args;
    const searchQuery: SearchQuery = createSearchQuery(image);
    const imageFound: Image = await ImageModel.findOne(searchQuery);

    return {
      image: imageFound
    };
  } catch (error) {
    Logger.error('Internal Server Error', { error, file: 'image.query.image' });

    return serverError('There was an error with this request. Please try again later');
  }
};
