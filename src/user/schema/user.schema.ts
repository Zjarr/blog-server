import { gql } from 'apollo-server-express';

import { ISocial } from '../../social/schema';

export interface IUser {
  _id?: string;
  about?: string;
  created: Date;
  email: string;
  firstname: string;
  image?: string;
  lastname: string;
  password?: string;
  social?: ISocial[];
}

export const BaseSchemaUser = gql`
  type User {
    _id: String
    about: String
    created: Date!
    email: String!
    firstname: String!
    image: String
    lastname: String!
    password: String
    social: [ Social ]
  }
`;
