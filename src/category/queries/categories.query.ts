import { Document, PaginateResult } from 'mongoose';

import { IError } from '../../error/schema';
import { IPagination } from '../../pagination/schema';
import { paginationResult } from '../../utils/functions';
import { serverError } from '../../utils/values';

import { CategoryModel } from '../model';
import { ICategoriesSuccess, ICategory, IGetCategoriesInput } from '../schema';

interface ISearchQuery {
  active?: boolean;
  name?: {
    $regex: RegExp;
  };
}

const createSearchQuery = (query: IGetCategoriesInput): ISearchQuery => {
  const searchQuery: ISearchQuery = {};
  const { active, name } = query;

  if (active !== undefined) {
    searchQuery.active = active;
  }

  if (name) {
    searchQuery.name = {
      $regex: new RegExp(`${name}`, 'i')
    };
  }

  return searchQuery;
};

export const categories = async (_parent: object, args: { categories: IGetCategoriesInput }): Promise<ICategoriesSuccess | IError> => {
  try {
    const { categories } = args;
    const searchQuery: ISearchQuery = createSearchQuery(categories);
    const categoriesFound: PaginateResult<ICategory & Document> = await CategoryModel.paginate(searchQuery, { ...categories.pagination });
    const pagination: IPagination = paginationResult(categoriesFound);

    return {
      categories: categoriesFound.docs,
      pagination
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later.');
  }
};
