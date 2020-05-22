import jwt from 'jsonwebtoken';

import { Env } from '../../../env';

import { IUser } from '../../user/schema';

export const verifyJWT = (authorization: string): IUser | null => {
  const tokenWithBearer = authorization || '';
  const token = tokenWithBearer.split(' ')[1];

  try {
    if (!token) {
      return null;
    }

    return jwt.verify(token, Env.JWT_PRIVATE) as IUser;
  } catch (error) {
    return null;
  }
};
