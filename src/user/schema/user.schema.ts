import { gql } from 'apollo-server-express';

import { ISocial } from '../../social/schema';

export interface IUser {
  _id?: string;
  about?: string;
  created: string;
  email: string;
  image?: string;
  lastname: string;
  name: string;
  password: string;
  social?: ISocial[];
}

export const BaseSchemaUser = gql`
  type User {
    _id: String
    about: String
    created: String!
    email: String!
    image: String
    lastname: String!
    name: String!
    password: String!
    social: [ Social ]
  }
`;
