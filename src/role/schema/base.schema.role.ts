import { gql } from 'apollo-server-express';

export enum IPermission {
  CREATE_ASSET = 'CREATE_ASSET',
  CREATE_BLOG = 'CREATE_BLOG',
  CREATE_CATEGORY = 'CREATE_CATEGORY',
  CREATE_ROLE = 'CREATE_ROLE',
  CREATE_USER = 'CREATE_USER',
  UPDATE_ASSET = 'UPDATE_ASSET',
  UPDATE_BLOG = 'UPDATE_BLOG',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  UPDATE_ROLE = 'UPDATE_ROLE',
  UPDATE_USER = 'UPDATE_USER',
  VIEW_ASSET = 'VIEW_ASSET',
  VIEW_ROLE = 'VIEW_ROLE',
  VIEW_USER = 'VIEW_USER'
}

export interface IRole {
  active: boolean;
  description: string;
  name: string;
  permissions: IPermission[];
}

export const BaseSchemaRole = gql`
  type Role {
    active: String!
    description: String!
    name: String!
    permissions: [ String ]!
  }
`;
