import jwt from 'jsonwebtoken';

import { Env } from '../../../env';

import { IUser } from '../../user/schema';

export const verifyJWT = (authorization: string | undefined): IUser | null => {
  const token = authorization || '';

  try {
    if (!token) {
      return null;
    }

    return jwt.verify(token, Env.JWT_PRIVATE!) as IUser;
  } catch (error) {
    return null;
  }
};
