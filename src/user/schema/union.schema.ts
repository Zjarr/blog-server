import { gql } from 'apollo-server-express';

import { IUser } from './user.schema';

export interface ILoginSuccess {
  token: string;
}

export interface IUserSuccess {
  user: IUser | null;
}

export const UnionSchemaUser = gql`
  union LoginPayload = LoginSuccess | Error
  union UserPayload = UserSuccess | Error

  type LoginSuccess {
    token: String
  }

  type UserSuccess {
    user: User
  }
`;
