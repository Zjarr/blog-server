import { gql } from 'apollo-server-express';

import { IPagination } from '../../pagination/schema';

import { IBlog } from './blog.schema';

interface IBlogsCount {
  count: number;
}

export interface IBlogsReport {
  day: string;
  blogs: number;
}

export interface IBlogAmountSuccess {
  blogs: IBlogsCount;
}

export interface IBlogSuccess {
  blog: IBlog | null;
}

export interface IBlogsSuccess {
  blogs: IBlog[];
  pagination?: IPagination;
}

export interface IBlogsWeekSuccess {
  report: IBlogsReport[];
}

export const UnionSchemaBlog = gql`
  union BlogPayload = BlogSuccess | Error
  union BlogsAmountPayload = BlogsAmountSuccess | Error
  union BlogsPayload = BlogsSuccess | Error
  union BlogsWeekPayload = BlogsWeekSuccess | Error

  type BlogsReport {
    day: String!
    blogs: Int!
  }

  type BlogsCount {
    count: Int!
  }

  type BlogsAmountSuccess {
    blogs: BlogsCount
  }

  type BlogSuccess {
    blog: Blog
  }

  type BlogsSuccess {
    blogs: [ Blog ]
    pagination: Pagination
  }

  type BlogsWeekSuccess {
    report: [ BlogsReport ]
  }
`;
