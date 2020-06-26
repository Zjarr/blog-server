import { gql } from 'apollo-server-express';

export interface IPictureInput {
  _id: string;
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
  active: boolean;
  email: string;
  lastname: string;
  name: string;
  password: string;
  role: string;
  social?: ISocialInput[];
}

export const MutationSchemaUser = gql`
  input PictureInput {
    _id: String!
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
    active: Boolean!
    email: String!
    lastname: String!
    name: String!
    password: String!
    role: String!
    social: [ SocialInput ]
  }

  extend type Mutation {
    login(user: LoginInput!): LoginPayload!
    password(password: PasswordInput!): UserPayload!
    picture(file: Upload!, picture: PictureInput!): UserPayload!
    user(file: Upload, user: UserInput): UserPayload!
  }
`;
