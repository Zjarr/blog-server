import { gql } from 'apollo-server-express';

export interface ICategory {
  active: boolean;
  description?: string;
  icon: string;
  name: string;
}

export const BaseSchemaCategory = gql`
  type Category {
    active: Boolean!
    description: String
    icon: String!
    name: String!
  }
`;
