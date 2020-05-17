import { Document, PaginateResult } from 'mongoose';

import { Logger } from '../../../logger';

import { Error } from '../../error/schema';
import { paginationResult } from '../../lib/functions';
import { serverError } from '../../lib/values';
import { Pagination } from '../../pagination/schema';

import { CategoryModel } from '../model';
import { CategoriesSuccess, Category, GetCategoriesInput } from '../schema';

interface SearchQuery {
  active?: boolean;
}

const createSearchQuery = (query: GetCategoriesInput): SearchQuery => {
  const searchQuery: SearchQuery = { };
  const { active } = query;

  if (active) {
    searchQuery.active = active;
  }

  return searchQuery;
};

export const categories = async (_: object, args: { categories: GetCategoriesInput }): Promise<CategoriesSuccess | Error> => {
  try {
    const { categories } = args;
    const searchQuery: SearchQuery = createSearchQuery(categories);
    const categoriesFound: PaginateResult<Category & Document> = await CategoryModel.paginate(searchQuery, { ...categories.pagination });
    const pagination: Pagination = paginationResult(categoriesFound);

    return {
      categories: categoriesFound.docs,
      pagination
    };
  } catch (error) {
    Logger.error('Internal Server Error', { error, file: 'categories.query.category' });

    return serverError('There was an error with this request. Please try again later');
  }
};
