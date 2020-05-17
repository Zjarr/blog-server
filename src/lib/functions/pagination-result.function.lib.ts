import { Document, PaginateResult } from 'mongoose';

import { Blog } from '../../blog/schema';
import { Category } from '../../category/schema';
import { Image } from '../../image/schema';
import { Pagination } from '../../pagination/schema';
import { Role } from '../../role/schema';
import { User } from '../../user/schema';

export const paginationResult = (pagination: PaginateResult<Blog | Category | Image | Role | User & Document>): Pagination => {
  const { limit, hasNextPage: next, hasPrevPage: prev, page, totalDocs: total } = pagination;

  return { limit, next, page, prev, total };
};
