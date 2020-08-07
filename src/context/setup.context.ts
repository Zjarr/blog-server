import { Request } from 'express';

import { verifyJWT } from '../utils/jwt';
import { IUser } from '../user/schema';

export interface IContext {
  session: IUser | null;
}

export const context = (ctx: { req: Request }): IContext => {
  const { req } = ctx;

  const session = verifyJWT(req.cookies.authorization);

  return {
    session
  };
};
