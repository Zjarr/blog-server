import { gql } from 'apollo-server-express';

export interface ICategory {
  _id?: string;
  active: boolean;
  description?: string;
  icon: string;
  name: string;
}

export const BaseSchemaCategory = gql`
  type Category {
    _id: String
    active: Boolean!
    description: String
    icon: String!
    name: String!
  }
`;
