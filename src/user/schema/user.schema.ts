import { gql } from 'apollo-server-express';

import { ISocial } from '../../social/schema';

export interface IUser {
  _id?: string;
  about?: string;
  created: string;
  email: string;
  firstname: string;
  lastname: string;
  password?: string;
  picture?: string;
  social?: ISocial[];
}

export const BaseSchemaUser = gql`
  type User {
    _id: String
    about: String
    created: String!
    email: String!
    firstname: String!
    lastname: String!
    password: String
    picture: String
    social: [ Social ]
  }
`;
