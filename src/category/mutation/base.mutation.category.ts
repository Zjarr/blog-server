import { Logger } from '../../../logger';

import { Context } from '../../context';
import { Error } from '../../error/schema';
import { isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { Permission } from '../../role/schema';

import { CategoryModel } from '../model';
import { Category, CategoryInput, CategorySuccess } from '../schema';

export const category = async (_: object, args: { category: CategoryInput }, ctx: Context): Promise<CategorySuccess | Error> => {
  try {
    const { category } = args;
    const { session } = ctx;
    let authorized: boolean;

    if (category._id) {
      authorized = await isAuthorized(session, Permission.UPDATE_CATEGORY);
    } else {
      authorized = await isAuthorized(session, Permission.CREATE_CATEGORY);
    }

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const formatedName = category.name.trim().toLowerCase();
    let categoryResult: Category;

    if (category._id) {
      categoryResult = await CategoryModel.findByIdAndUpdate(category._id, category, { new: true });
    } else {
      categoryResult = await CategoryModel.create({ ...category, name: formatedName });
    }

    return {
      category: categoryResult
    };

  } catch (error) {
    Logger.error('Internal Server Error', { error, file: 'category.mutation.category' });

    return serverError('There was an error with this request. Please try again later');
  }
};
