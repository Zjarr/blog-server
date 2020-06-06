import Moment from 'moment';

import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized } from '../../lib/functions';
import { serverError, unauthorized } from '../../lib/values';
import { IPermission } from '../../role/schema';

import { BlogModel } from '../model';
import { IBlog, IBlogInput, IBlogSuccess } from '../schema';

export const blog = async (_: object, args: { blog: IBlogInput }, ctx: IContext): Promise<IBlogSuccess | IError> => {
  try {
    const { blog } = args;
    const { session } = ctx;
    let authorized: boolean;

    if (blog._id) {
      authorized = await isAuthorized(session, IPermission.UPDATE_BLOG);
    } else {
      authorized = await isAuthorized(session, IPermission.CREATE_BLOG);
    }

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action');
    }

    const now = Moment().utc().format('YYYY-MM-DDTHH:mm:ss');
    const slug = blog.slug.trim().toLowerCase();
    let blogResult: IBlog;

    if (blog._id) {
      blogResult = await BlogModel.findByIdAndUpdate({ _id: blog._id }, { ...blog, slug, updated: now }, { new: true });
    } else {
      blogResult = await BlogModel.create({ ...blog, created: now, slug, updated: now });
    }

    return {
      blog: blogResult
    };

  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
