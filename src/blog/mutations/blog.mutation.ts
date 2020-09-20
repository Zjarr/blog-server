import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized } from '../../utils/functions';
import { conflict, serverError, unauthorized } from '../../utils/values';

import { BlogModel } from '../model';
import { IBlog, IBlogInput, IBlogSuccess } from '../schema';

export const blog = async (_parent: object, args: { blog: IBlogInput }, ctx: IContext): Promise<IBlogSuccess | IError> => {
  try {
    const { blog } = args;
    const { session } = ctx;
    const authorized: boolean = await isAuthorized(session);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action.');
    }

    const blogFound: IBlog | null = await BlogModel.findOne({ slug: blog.slug });

    if (!blog._id && blogFound) {
      return conflict('Already exists a blog with the provided slug.');
    }

    const now = new Date();
    const slug = blog.slug.trim().toLowerCase();
    let blogResult: IBlog | null;

    if (blog._id) {
      blogResult = await BlogModel.findByIdAndUpdate({ _id: blog._id }, { ...blog, slug, updated: now }, { new: true });
    } else {
      blogResult = await BlogModel.create({ ...blog, created: now, slug, updated: now });
    }

    return {
      blog: blogResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later.');
  }
};
