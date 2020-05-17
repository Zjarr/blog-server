import { gql } from 'apollo-server-express';

import { Pagination } from '../../pagination/schema';

import { Role } from './base.schema.role';

export interface RoleSuccess {
  role: Role;
}
export interface RolesSuccess {
  pagination: Pagination;
  roles: Role[];
}

export const UnionSchemaRole = gql`
  union RolePayload = RoleSuccess | Error
  union RolesPayload = RolesSuccess | Error

  type RoleSuccess {
    role: Role
  }

  type RolesSuccess {
    pagination: Pagination!
    roles: [ Role ]
  }
`;
