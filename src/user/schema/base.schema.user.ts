import { gql } from 'apollo-server-express';

import { Social } from '../../social/schema';

export interface User {
  _id?: string;
  about: string;
  active: boolean;
  created: string;
  email: string;
  lastname: string;
  name: string;
  password: string;
  picture?: string;
  role: string;
  social?: Social[];
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
