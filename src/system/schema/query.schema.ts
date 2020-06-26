import { gql } from 'apollo-server-express';

export const QuerySchemaSystem = gql`
  extend type Query {
    system: System!
  }
`;
