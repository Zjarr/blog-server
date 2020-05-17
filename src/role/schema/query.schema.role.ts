import { gql } from 'apollo-server-express';

import { PaginationInput } from '../../pagination/schema';

export interface GetRoleInput {
  _id?: string;
  name?: string;
}

export interface GetRolesInput {
  active?: boolean;
  pagination: PaginationInput;
}

export const QuerySchemaRole = gql`
  input GetRoleInput {
    _id: String
    name: String
  }

  input GetRolesInput {
    active: Boolean
    pagination: PaginationInput!
  }

  extend type Query {
    role(role: GetRoleInput!): RolePayload!
    roles(roles: GetRolesInput!): RolesPayload!
  }
`;
