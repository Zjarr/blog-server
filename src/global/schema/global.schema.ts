import { gql } from 'apollo-server-express';

export const BaseSchemaGlobal = gql`
  type Mutation
  type Query

  scalar Upload
`;
