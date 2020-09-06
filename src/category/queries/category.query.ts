import { IError } from '../../error/schema';
import { isId } from '../../utils/functions';
import { serverError } from '../../utils/values';

import { CategoryModel } from '../model';
import { ICategory, ICategorySuccess, IGetCategoryInput } from '../schema';

interface ISearchQuery {
  _id?: string;
}

const createSearchQuery = (query: IGetCategoryInput): ISearchQuery => {
  const searchQuery: ISearchQuery = {};
  const { _id } = query;

  if (_id) {
    searchQuery._id = _id;
  }

  return searchQuery;
};

const nullCategory = (): ICategorySuccess => {
  return {
    category: null
  };
};

export const category = async (_parent: object, args: { category: IGetCategoryInput }): Promise<ICategorySuccess | IError> => {
  try {
    const { category } = args;

    if (category._id && !isId(category._id)) return nullCategory();

    const searchQuery = createSearchQuery(category);
    const categoryFound: ICategory | null = await CategoryModel.findOne(searchQuery);

    return {
      category: categoryFound
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later.');
  }
};
