import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { IPermission } from '../../role/schema';

import { CategoryModel } from '../model';
import { ICategory, ICategoryInput, ICategorySuccess } from '../schema';

export const category = async (_: object, args: { category: ICategoryInput }, ctx: IContext): Promise<ICategorySuccess | IError> => {
  try {
    const { category } = args;
    const { session } = ctx;
    let authorized: boolean;

    if (category._id) {
      authorized = await isAuthorized(session, IPermission.UPDATE_CATEGORY);
    } else {
      authorized = await isAuthorized(session, IPermission.CREATE_CATEGORY);
    }

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const formatedName = category.name.trim().toLowerCase();
    let categoryResult: ICategory;

    if (category._id) {
      categoryResult = await CategoryModel.findByIdAndUpdate(category._id, category, { new: true });
    } else {
      categoryResult = await CategoryModel.create({ ...category, name: formatedName });
    }

    return {
      category: categoryResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
