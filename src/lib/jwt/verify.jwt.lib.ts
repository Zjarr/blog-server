import jwt from 'jsonwebtoken';

import { Env } from '../../../env';

import { User } from '../../user/schema';

export const verifyJWT = (authorization: string): User | null => {
  const tokenWithBearer = authorization || '';
  const token = tokenWithBearer.split(' ')[1];

  try {
    if (!token) {
      return null;
    }

    return jwt.verify(token, Env.JWT_PRIVATE) as User;
  } catch (error) {
    return null;
  }
};
