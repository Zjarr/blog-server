import { Request } from 'express';

import { verifyJWT } from '../lib/jwt';
import { IUser } from '../user/schema';

export interface IContext {
  session: IUser | null;
}

export const context = (ctx: { req: Request }): IContext => {
  const { req: { headers } } = ctx;
  const session = verifyJWT(headers.authorization);

  return {
    session
  };
};
