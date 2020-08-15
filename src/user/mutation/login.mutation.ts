import { IError } from '../../error/schema';
import { decrypt } from '../../utils/functions';
import { createJWT } from '../../utils/jwt';
import { forbidden, notFound, serverError } from '../../utils/values';

import { UserModel } from '../model';
import { ILoginSuccess, IUser, IUserLoginInput } from '../schema';

export const login = async (_: object, args: { user: IUserLoginInput }): Promise<ILoginSuccess | IError> => {
  try {
    const { user } = args;
    const userFound: IUser | null = await UserModel.findOne({ email: user.email });

    if (!userFound) {
      return notFound('User does not exist');
    }

    const passwordMatch = decrypt(user.password, userFound.password!);

    if (!passwordMatch) {
      return forbidden('Password does not match');
    }

    const {
      _id,
      about,
      created,
      email,
      firstname,
      lastname,
      picture,
      social
    } = userFound;

    const token: string = createJWT({ _id, about, created, email, firstname, picture, lastname, social });

    return {
      token
    };
  } catch (error) {
    return serverError('There was an error with this request. Please try again later');
  }
};
