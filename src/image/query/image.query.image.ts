import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { IPermission } from '../../role/schema';

import { ImageModel } from '../model';
import { IGetImageInput, IImage, IImageSuccess } from '../schema';

interface ISearchQuery {
  _id?: string;
  url?: string;
}

const createSearchQuery = (query: IGetImageInput): ISearchQuery => {
  const searchQuery: ISearchQuery = { };
  const { _id, url } = query;

  if (_id) {
    searchQuery._id = _id;
  }

  if (url) {
    searchQuery.url = url;
  }

  return searchQuery;
};

export const image = async (_: object, args: { image: IGetImageInput }, ctx: IContext): Promise<IImageSuccess | IError> => {
  try {
    const { session } = ctx;
    const authorized = await isAuthorized(session, IPermission.VIEW_ASSET);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const { image } = args;
    const searchQuery: ISearchQuery = createSearchQuery(image);
    const imageFound: IImage | null = await ImageModel.findOne(searchQuery);

    return {
      image: imageFound
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
