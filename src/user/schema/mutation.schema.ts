import { gql } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

export interface IUserLoginInput {
  email: string;
  password: string;
}

export interface IUserPasswordInput {
  _id: string;
  current: string;
  updated: string;
}

export interface IUserSocialInput {
  icon: string;
  name: string;
  url: string;
}

export interface IUserInput {
  _id?: string;
  about?: string;
  email: string;
  file?: FileUpload;
  firstname: string;
  image?: string;
  lastname: string;
  password?: string;
  social?: IUserSocialInput[];
}

export const MutationSchemaUser = gql`
  input UserLoginInput {
    email: String!
    password: String!
  }

  input UserPasswordInput {
    _id: String!
    current: String!
    updated: String!
  }

  input UserSocialInput {
    icon: String!
    name: String!
    url: String!
  }

  input UserInput {
    _id: String
    about: String
    email: String!
    file: Upload
    firstname: String!
    image: String
    lastname: String!
    password: String
    social: [ UserSocialInput ]
  }

  extend type Mutation {
    login(user: UserLoginInput!): LoginPayload!
    password(password: UserPasswordInput!): UserPayload!
    user(user: UserInput!): UserPayload!
  }
`;
