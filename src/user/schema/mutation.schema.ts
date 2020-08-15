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

export interface IUserImageInput {
  file?: FileUpload;
  remove: boolean;
}

export interface IUserInput {
  _id?: string;
  about?: string;
  email: string;
  image?: IUserImageInput;
  firstname: string;
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
    old: String!
    new: String!
  }

  input UserSocialInput {
    icon: String!
    name: String!
    url: String!
  }

  input UserImageInput {
    file: Upload
    remove: Boolean!
  }

  input UserInput {
    _id: String
    about: String
    email: String!
    firstname: String!
    image: UserImageInput
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
