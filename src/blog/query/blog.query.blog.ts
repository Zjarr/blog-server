import { Error } from '../../error/schema';
import { serverError } from '../../lib/values';

import { BlogModel } from '../model';
import { Blog, BlogSuccess, GetBlogInput } from '../schema';

interface SearchQuery {
  _id?: string;
  slug?: string;
}

const createSearchQuery = (query: GetBlogInput): SearchQuery => {
  const searchQuery: SearchQuery = { };
  const { _id, slug } = query;

  if (_id) {
    searchQuery._id = _id;
  }

  if (slug) {
    searchQuery.slug = slug;
  }

  return searchQuery;
};

export const blog = async (_: object, args: { blog: GetBlogInput }): Promise<BlogSuccess | Error> => {
  try {
    const { blog } = args;
    const searchQuery: SearchQuery = createSearchQuery(blog);
    const blogFound: Blog = await BlogModel.findOne(searchQuery);

    return {
      blog: blogFound
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
