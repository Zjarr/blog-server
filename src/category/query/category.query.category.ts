import { IError } from '../../error/schema';
import { serverError } from '../../lib/values';

import { CategoryModel } from '../model';
import { ICategory, ICategorySuccess, IGetCategoryInput } from '../schema';

interface ISearchQuery {
  _id?: string;
  name?: string;
}

const createSearchQuery = (query: IGetCategoryInput): ISearchQuery => {
  const searchQuery: ISearchQuery = { };
  const { _id, name } = query;

  if (_id) {
    searchQuery._id = _id;
  }

  if (name) {
    searchQuery.name = name;
  }

  return searchQuery;
};

export const category = async (_: object, args: { category: IGetCategoryInput }): Promise<ICategorySuccess | IError> => {
  try {
    const { category } = args;
    const searchQuery = createSearchQuery(category);
    const categoryFound: ICategory = await CategoryModel.findOne(searchQuery);

    return {
      category: categoryFound
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
