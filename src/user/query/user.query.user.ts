import { Logger } from '../../../logger';

import { Error } from '../../error/schema';
import { serverError } from '../../lib/values';

import { UserModel } from '../model';
import { GetUserInput, User, UserSuccess } from '../schema';

interface SearchQuery {
  _id?: string;
  email?: string;
}

const createSearchQuery = (query: GetUserInput): SearchQuery => {
  const searchQuery: SearchQuery = { };
  const { _id, email } = query;

  if (_id) {
    searchQuery._id = _id;
  }

  if (email) {
    searchQuery.email = email;
  }

  return searchQuery;
};

export const user = async (_: object, args: { user: GetUserInput }): Promise<UserSuccess | Error> => {
  try {
    const { user } = args;
    const searchQuery: SearchQuery = createSearchQuery(user);
    const userResult: User = await UserModel.findOne(searchQuery);

    return {
      user: userResult
    };
  } catch (error) {
    Logger.error('Internal Server Error', { error, file: 'user.query.user' });

    return serverError('There was an error with this request. Please try again later');
  }
};
