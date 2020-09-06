import { IError } from '../../error/schema';
import { isId } from '../../utils/functions';
import { serverError } from '../../utils/values';

import { UserModel } from '../model';
import { IGetUserInput, IUser, IUserSuccess } from '../schema';

interface ISearchQuery {
  _id?: string;
}

const createSearchQuery = (query: IGetUserInput): ISearchQuery => {
  const searchQuery: ISearchQuery = {};
  const { _id } = query;

  if (_id) {
    searchQuery._id = _id;
  }

  return searchQuery;
};

const userNull = (): IUserSuccess => {
  return {
    user: null
  };
};

export const user = async (_parent: object, args: { user: IGetUserInput }): Promise<IUserSuccess | IError> => {
  try {
    const { user } = args;

    if (user._id && !isId(user._id)) {
      return userNull();
    }

    const searchQuery: ISearchQuery = createSearchQuery(user);
    const userResult: IUser | null = await UserModel.findOne(searchQuery);

    return {
      user: userResult
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later.');
  }
};
