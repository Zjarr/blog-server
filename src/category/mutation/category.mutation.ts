import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized } from '../../utils/functions';
import { conflict, serverError, unauthorized } from '../../utils/values';

import { CategoryModel } from '../model';
import { ICategory, ICategoryInput, ICategorySuccess } from '../schema';

export const category = async (_: object, args: { category: ICategoryInput }, ctx: IContext): Promise<ICategorySuccess | IError> => {
  try {
    const { category } = args;
    const { session } = ctx;
    const authorized: boolean = await isAuthorized(session);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action.');
    }

    const formatedName = category.name.trim().toLowerCase();
    const categoryFound: ICategory | null = await CategoryModel.findOne({ name: formatedName });

    if (!category._id && categoryFound) {
      return conflict('Already exists a category with the provided name.');
    }

    let categoryResult: ICategory | null;

    if (category._id) {
      categoryResult = await CategoryModel.findByIdAndUpdate(category._id, category, { new: true });
    } else {
      categoryResult = await CategoryModel.create({ ...category, name: formatedName });
    }

    return {
      category: categoryResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later.');
  }
};
