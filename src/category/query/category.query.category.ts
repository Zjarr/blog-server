import { Error } from '../../error/schema';
import { serverError } from '../../lib/values';

import { CategoryModel } from '../model';
import { Category, CategorySuccess, GetCategoryInput } from '../schema';

interface SearchQuery {
  _id?: string;
  name?: string;
}

const createSearchQuery = (query: GetCategoryInput): SearchQuery => {
  const searchQuery: SearchQuery = { };
  const { _id, name } = query;

  if (_id) {
    searchQuery._id = _id;
  }

  if (name) {
    searchQuery.name = name;
  }

  return searchQuery;
};

export const category = async (_: object, args: { category: GetCategoryInput }): Promise<CategorySuccess | Error> => {
  try {
    const { category } = args;
    const searchQuery = createSearchQuery(category);
    const categoryFound: Category = await CategoryModel.findOne(searchQuery);

    return {
      category: categoryFound
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
