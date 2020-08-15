import JWT from 'jsonwebtoken';

import { Env } from '../../../env';

export const createJWT = (_id: string): string => {
  return JWT.sign({ _id }, Env.JWT_PRIVATE!, { expiresIn: Env.JWT_EXPIRE });
};
