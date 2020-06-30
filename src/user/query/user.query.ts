import { IError } from '../../error/schema';
import { serverError } from '../../utils/values';

import { UserModel } from '../model';
import { IGetUserInput, IUser, IUserSuccess } from '../schema';

interface ISearchQuery {
  _id?: string;
  email?: string;
}

const createSearchQuery = (query: IGetUserInput): ISearchQuery => {
  const searchQuery: ISearchQuery = {};
  const { _id, email } = query;

  if (_id) {
    searchQuery._id = _id;
  }

  if (email) {
    searchQuery.email = email;
  }

  return searchQuery;
};

export const user = async (_: object, args: { user: IGetUserInput }): Promise<IUserSuccess | IError> => {
  try {
    const { user } = args;
    const searchQuery: ISearchQuery = createSearchQuery(user);
    const userResult: IUser | null = await UserModel.findOne(searchQuery);

    return {
      user: userResult
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
