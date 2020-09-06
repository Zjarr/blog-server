import { IError } from '../../error/schema';

import { IBlogAmountSuccess } from '../schema';

export const blogsAmount = async (): Promise<IBlogAmountSuccess | IError> => {
  return {
    blogs: {
      count: 0
    }
  };
};
