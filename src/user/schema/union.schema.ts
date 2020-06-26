import { gql } from 'apollo-server-express';

import { IPagination } from '../../pagination/schema';

import { IUser } from './user.schema';

export interface ILoginSuccess {
  token: string;
  user: IUser;
}

export interface IUserSuccess {
  user: IUser | null;
}

export interface IUsersSuccess {
  pagination: IPagination;
  users: IUser[];
}

export const UnionSchemaUser = gql`
  union LoginPayload = LoginSuccess | Error
  union UserPayload = UserSuccess | Error
  union UsersPayload = UsersSuccess | Error

  type LoginSuccess {
    token: String
    user: User
  }

  type UserSuccess {
    user: User
  }

  type UsersSuccess {
    pagination: Pagination!
    users: [ User ]
  }
`;
