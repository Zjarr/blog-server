import { gql } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

export interface IPictureInput {
  _id: string;
  file?: FileUpload;
  url?: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IPasswordInput {
  _id: string;
  old: string;
  new: string;
}

export interface ISocialInput {
  icon: string;
  name: string;
  url: string;
}

export interface IUserInput {
  _id?: string;
  about?: string;
  email: string;
  lastname: string;
  file?: FileUpload;
  name: string;
  password: string;
  social?: ISocialInput[];
}

export const MutationSchemaUser = gql`
  input PictureInput {
    _id: String!
    file: Upload
    url: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input PasswordInput {
    _id: String!
    old: String!
    new: String!
  }

  input SocialInput {
    icon: String!
    name: String!
    url: String!
  }

  input UserInput {
    _id: String
    about: String
    email: String!
    lastname: String!
    file: Upload
    name: String!
    password: String!
    social: [ SocialInput ]
  }

  extend type Mutation {
    login(user: LoginInput!): LoginPayload!
    password(password: PasswordInput!): UserPayload!
    picture(picture: PictureInput!): UserPayload!
    user(user: UserInput!): UserPayload!
  }
`;
