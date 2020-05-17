import Moment from 'moment';

import { Logger } from '../../../logger';

import { Context } from '../../context';
import { Error } from '../../error/schema';
import { isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { Permission } from '../../role/schema';

import { BlogModel } from '../model';
import { Blog, BlogInput, BlogSuccess } from '../schema';

export const blog = async (_: object, args: { blog: BlogInput }, ctx: Context): Promise<BlogSuccess | Error> => {
  try {
    const { blog } = args;
    const { session } = ctx;
    let authorized: boolean;

    if (blog._id) {
      authorized = await isAuthorized(session, Permission.UPDATE_BLOG);
    } else {
      authorized = await isAuthorized(session, Permission.CREATE_BLOG);
    }

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const now = Moment().utc().format('YYYY-MM-DDTHH:mm:ss');
    const unique = blog.slug.trim().toLowerCase();
    let blogResult: Blog;

    if (blog._id) {
      blogResult = await BlogModel.findByIdAndUpdate({ _id: blog._id }, { ...blog, unique, updated: now }, { new: true });
    } else {
      blogResult = await BlogModel.create({ ...blog, created: now, unique, updated: now });
    }

    return {
      blog: blogResult
    };

  } catch (error) {
    Logger.error('Internal Server Error', { error, file: 'blog.mutation.blog' });

    return serverError('There was an error with this request. Please try again later');
  }
};
