import { gql } from 'apollo-server-express';

import { ISocial } from '../../social/schema';

export interface IUser {
  _id?: string;
  about?: string;
  active: boolean;
  created: string;
  email: string;
  lastname: string;
  name: string;
  password: string;
  picture?: string;
  role: string;
  social?: ISocial[];
}

export const BaseSchemaUser = gql`
  type User {
    _id: String
    about: String
    active: Boolean!
    created: String!
    email: String!
    lastname: String!
    name: String!
    password: String!
    picture: String
    role: String!
    social: [ Social ]
  }
`;
