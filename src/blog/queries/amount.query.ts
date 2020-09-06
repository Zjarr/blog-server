import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized } from '../../utils/functions';
import { unauthorized } from '../../utils/values';

import { IBlogAmountSuccess } from '../schema';
import { BlogModel } from '../model';

export const blogsAmount = async (_parent: object, _args: object, ctx: IContext): Promise<IBlogAmountSuccess | IError> => {
  const { session } = ctx;
  const authorized: boolean = await isAuthorized(session);

  if (!authorized) {
    return unauthorized('You are not allowed to perform this action.');
  }

  const blogsAmount: number = await BlogModel.countDocuments({});

  return {
    blogs: {
      count: blogsAmount
    }
  };
};
