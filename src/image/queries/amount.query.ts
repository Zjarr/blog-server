import { IContext } from '../../context';
import { IError } from '../../error/schema';
import { isAuthorized } from '../../utils/functions';
import { unauthorized, serverError } from '../../utils/values';

import { ImageModel } from '../model';
import { IImagesAmountSuccess } from '../schema';

export const imagesAmount = async (_parent: object, _args: object, ctx: IContext): Promise<IImagesAmountSuccess | IError> => {
  try {
    const { session } = ctx;
    const authorized = await isAuthorized(session);

    if (!authorized) {
      return unauthorized('You are not allowed to perform this action.');
    }

    const imagesAmount: number = await ImageModel.countDocuments({});

    return {
      images: {
        count: imagesAmount
      }
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later.');
  }
};
