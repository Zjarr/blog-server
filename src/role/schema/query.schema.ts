import { gql } from 'apollo-server-express';

import { IPaginationInput } from '../../pagination/schema';

export interface IGetRoleInput {
  _id?: string;
  name?: string;
}

export interface IGetRolesInput {
  active?: boolean;
  pagination: IPaginationInput;
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
