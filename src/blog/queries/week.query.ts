import { IError } from '../../error/schema';

import { IBlogsWeekSuccess } from '../schema';

export const blogsWeek = async (): Promise<IBlogsWeekSuccess | IError> => {
  return {
    report: []
  };
};
