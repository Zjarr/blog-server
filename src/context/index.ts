import { Request } from 'express';

import { verifyJWT } from '../lib/jwt';
import { User } from '../user/schema';

export interface Context {
  origin: string | string[];
  session: User;
}

export const context = (ctx: { req: Request }): Context => {
  const { req: { headers } } = ctx;
  const origin = headers.origin;
  const session = verifyJWT(headers.authorization);

  return {
    origin,
    session
  };
};
