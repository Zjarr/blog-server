import { gql } from 'apollo-server-express';

import { Permission } from './base.schema.role';

export interface RoleInput {
  _id?: string;
  active: boolean;
  description: string;
  name: string;
  permissions: Permission[];
}

export const MutationSchemaRole = gql`
  enum Permission {
    CREATE_ASSET,
    CREATE_BLOG,
    CREATE_CATEGORY,
    CREATE_ROLE,
    CREATE_USER,
    UPDATE_ASSET,
    UPDATE_BLOG,
    UPDATE_CATEGORY,
    UPDATE_ROLE,
    UPDATE_USER,
    VIEW_ASSET,
    VIEW_ROLE,
    VIEW_USER
  }

  input RoleInput {
    _id: String
    active: Boolean!
    description: String!
    name: String!
    permissions: [ Permission ]!
  }

  extend type Mutation {
    role(role: RoleInput!): RolePayload!
  }
`;
