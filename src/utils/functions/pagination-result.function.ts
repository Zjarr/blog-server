import { Document, PaginateResult } from 'mongoose';

import { IBlog } from '../../blog/schema';
import { ICategory } from '../../category/schema';
import { IImage } from '../../image/schema';
import { IPagination } from '../../pagination/schema';
import { IUser } from '../../user/schema';

export const paginationResult = (pagination: PaginateResult<IBlog | ICategory | IImage | IUser & Document>): IPagination => {
  const { limit, hasNextPage: next, hasPrevPage: prev, page, totalDocs: total } = pagination;

  return { limit, next, page, prev, total };
};
