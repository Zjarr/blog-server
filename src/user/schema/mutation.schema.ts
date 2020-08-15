import { gql } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

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
  file?: FileUpload;
  firstname: string;
  lastname: string;
  password?: string;
  social?: ISocialInput[];
}

export const MutationSchemaUser = gql`
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
    firstname: String!
    file: Upload
    lastname: String!
    password: String
    social: [ SocialInput ]
  }

  extend type Mutation {
    login(user: LoginInput!): LoginPayload!
    password(password: PasswordInput!): UserPayload!
    user(user: UserInput!): UserPayload!
  }
`;
