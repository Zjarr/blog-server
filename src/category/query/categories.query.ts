import { Document, PaginateResult } from 'mongoose';

import { IError } from '../../error/schema';
import { paginationResult } from '../../lib/functions';
import { serverError } from '../../lib/values';
import { IPagination } from '../../pagination/schema';

import { CategoryModel } from '../model';
import { ICategoriesSuccess, ICategory, IGetCategoriesInput } from '../schema';

interface ISearchQuery {
  active?: boolean;
}

const createSearchQuery = (query: IGetCategoriesInput): ISearchQuery => {
  const searchQuery: ISearchQuery = { };
  const { active } = query;

  if (active) {
    searchQuery.active = active;
  }

  return searchQuery;
};

export const categories = async (_: object, args: { categories: IGetCategoriesInput }): Promise<ICategoriesSuccess | IError> => {
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
    return serverError('There was an error with this request. Please try again later');
  }
};