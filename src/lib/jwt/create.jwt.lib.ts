import JWT from 'jsonwebtoken';

import { Env } from '../../../env';

export const createJWT = (_id: string, active: boolean, email: string, lastname: string, name: string, role: string): string => {
  return JWT.sign({ _id, active, email, lastname, name, role }, Env.JWT_PRIVATE, { expiresIn: Env.JWT_EXPIRE });
};
