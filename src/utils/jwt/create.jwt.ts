import JWT from 'jsonwebtoken';

import { Env } from '../../../env';

export const createJWT = (email: string): string => {
  return JWT.sign({ email }, Env.JWT_PRIVATE!, { expiresIn: Env.JWT_EXPIRE });
};
