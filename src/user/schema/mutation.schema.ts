import { gql } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

export interface IUserLoginInput {
  email: string;
  password: string;
}

export interface IUserPasswordInput {
  _id: string;
  old: string;
  new: string;
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
  image?: FileUpload;
  firstname: string;
  lastname: string;
  password?: string;
  picture?: string;
  social?: IUserSocialInput[];
}

export const MutationSchemaUser = gql`
  input UserLoginInput {
    email: String!
    password: String!
  }

  input UserPasswordInput {
    _id: String!
    old: String!
    new: String!
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
    firstname: String!
    image: Upload
    lastname: String!
    password: String
    picture: String
    social: [ UserSocialInput ]
  }

  extend type Mutation {
    login(user: UserLoginInput!): LoginPayload!
    password(password: UserPasswordInput!): UserPayload!
    user(user: UserInput!): UserPayload!
  }
`;
