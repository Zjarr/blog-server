import { Document, PaginateResult } from 'mongoose';

import { Logger } from '../../../logger';

import { Error } from '../../error/schema';
import { paginationResult } from '../../lib/functions';
import { serverError } from '../../lib/values';
import { Pagination } from '../../pagination/schema';

import { BlogModel } from '../model';
import { Blog, BlogsSuccess, GetBlogsInput } from '../schema';

interface SearchQuery {
  active?: boolean;
  author?: string;
  categories?: {
    $in: string[];
  };
  keywords?: {
    $in: string[];
  };
  updated?: {
    $gte?: string;
    $lte?: string;
  };
}

const createSearchQuery = (query: GetBlogsInput): SearchQuery => {
  const { active, author, after, before, categories, keywords } = query;
  const searchQuery: SearchQuery = { };

  if (active) {
    searchQuery.active = active;
  }

  if (author) {
    searchQuery.author = author;
  }

  if (keywords) {
    searchQuery.keywords = {
      $in: keywords
    };
  }

  if (categories) {
    searchQuery.categories = {
      $in: categories
    };
  }

  if (after) {
    searchQuery.updated = {
      $gte: after
    };
  }

  if (before) {
    searchQuery.updated = {
      ...searchQuery.updated,
      $lte: before
    };
  }

  return searchQuery;
};

export const blogs = async (_: object, args: { blogs: GetBlogsInput }): Promise<BlogsSuccess | Error> => {
  try {
    const { blogs } = args;
    const searchQuery: SearchQuery = createSearchQuery(blogs);
    const blogsFound: PaginateResult<Blog & Document> = await BlogModel.paginate(searchQuery, { ...blogs.pagination });
    const pagination: Pagination = paginationResult(blogsFound);

    return {
      blogs: blogsFound.docs,
      pagination
    };
  } catch (error) {
    Logger.error('Internal Server Error', { error, file: 'blogs.query.blog' });

    return serverError('There was an error with this request. Please try again later');
  }
};
