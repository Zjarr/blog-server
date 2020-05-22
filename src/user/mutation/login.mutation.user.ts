import { IError } from '../../error/schema';
import { decrypt } from '../../lib/functions';
import { createJWT } from '../../lib/jwt';
import { forbidden, notFound, serverError, unauthorized } from '../../lib/values';

import { UserModel } from '../model';
import { ILoginInput, ILoginSuccess, IUser } from '../schema';

export const login = async (_: object, args: { user: ILoginInput }): Promise<ILoginSuccess | IError> => {
  try {
    const { user } = args;
    const userFound: IUser = await UserModel.findOne({ email: user.email });

    if (!userFound) {
      return notFound('User does not exist');
    }

    const passwordMatch = decrypt(user.password, userFound.password);

    if (!passwordMatch) {
      return forbidden('Password does not match');
    }

    if (!userFound.active) {
      return unauthorized('User has been disabled');
    }

    const { _id, active, email, lastname, name, role } = userFound;
    const token: string = createJWT(_id, active, email, lastname, name, role);
    delete user.password;

    return {
      user: userFound,
      token
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
