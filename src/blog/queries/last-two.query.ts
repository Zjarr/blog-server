import { IError } from '../../error/schema';

import { IBlogsSuccess } from '../schema';

export const blogsLastTwo = async (): Promise<IBlogsSuccess | IError> => {
  return {
    blogs: [],
    pagination: {
      total: 0,
      limit: 0,
      next: false,
      prev: false,
      page: 1
    }
  };
};
