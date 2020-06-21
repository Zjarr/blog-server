import { gql } from 'apollo-server-express';

import { IPagination } from '../../pagination/schema';

import { IRole } from './base.schema.role';

export interface IRoleSuccess {
  role: IRole | null;
}
export interface IRolesSuccess {
  pagination: IPagination;
  roles: IRole[];
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
