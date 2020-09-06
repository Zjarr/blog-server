import { IError } from '../../error/schema';

import { isId } from '../../utils/functions';
import { serverError } from '../../utils/values';

import { BlogModel } from '../model';
import { IBlog, IBlogSuccess, IGetBlogInput } from '../schema';

interface ISearchQuery {
  _id?: string;
  slug?: string;
}

const createSearchQuery = (query: IGetBlogInput): ISearchQuery => {
  const searchQuery: ISearchQuery = {};
  const { _id, slug } = query;

  if (_id) {
    searchQuery._id = _id;
  }

  if (slug) {
    searchQuery.slug = slug;
  }

  return searchQuery;
};

const nullBlog = (): IBlogSuccess => {
  return {
    blog: null
  };
};

export const blog = async (_parent: object, args: { blog: IGetBlogInput }): Promise<IBlogSuccess | IError> => {
  try {
    const { blog } = args;

    if (blog._id && !isId(blog._id)) {
      return nullBlog();
    }

    const searchQuery: ISearchQuery = createSearchQuery(blog);
    const blogFound: IBlog | null = await BlogModel.findOne(searchQuery);

    return {
      blog: blogFound
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later.');
  }
};
