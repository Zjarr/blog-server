import JWT from 'jsonwebtoken';

import { Env } from '../../../env';
import { IUser } from '../../user/schema';

export const createJWT = (user: IUser): string => {
  return JWT.sign({ user }, Env.JWT_PRIVATE!, { expiresIn: Env.JWT_EXPIRE });
};
