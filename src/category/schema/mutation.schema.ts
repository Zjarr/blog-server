import { gql } from 'apollo-server-express';

export interface ICategoryInput {
  _id?: string;
  active: boolean;
  description?: string;
  icon: string;
  name: string;
}

export const MutationSchemaCategory = gql`
  input CategoryInput {
    _id: String
    active: Boolean!
    description: String
    name: String!
    icon: String!
  }

  extend type Mutation {
    category(category: CategoryInput!): CategoryPayload!
  }
`;
