import { Request } from 'express';

import { verifyJWT } from '../lib/jwt';
import { IUser } from '../user/schema';

export interface IContext {
  origin: string | string[];
  session: IUser;
}

export const context = (ctx: { req: Request }): IContext => {
  const { req: { headers } } = ctx;
  const origin = headers.origin;
  const session = verifyJWT(headers.authorization);

  return {
    origin,
    session
  };
};
