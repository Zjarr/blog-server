import { Request } from 'express';

import { verifyJWT } from '../utils/jwt';
import { IUser } from '../user/schema';

export interface IContext {
  session: IUser | null;
}

const getToken = (authorization?: string): string => {
  if (!authorization) return '';

  return authorization.split(' ')[1];
};

export const context = (ctx: { req: Request }): IContext => {
  const { req: { headers: { authorization } } } = ctx;
  const token = getToken(authorization);

  const session = verifyJWT(token);

  return {
    session
  };
};
