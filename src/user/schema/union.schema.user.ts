import { gql } from 'apollo-server-express';

import { Pagination } from '../../pagination/schema';

import { User } from './base.schema.user';

export interface LoginSuccess {
  token: string;
  user: User;
}

export interface UserSuccess {
  user: User;
}

export interface UsersSuccess {
  pagination: Pagination;
  users: User[];
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
