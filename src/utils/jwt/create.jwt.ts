import JWT from 'jsonwebtoken';

import { Env } from '../../../env';

export const createJWT = (_id: string, email: string, lastname: string, name: string): string => {
  return JWT.sign({ _id, email, lastname, name }, Env.JWT_PRIVATE!, { expiresIn: Env.JWT_EXPIRE });
};
