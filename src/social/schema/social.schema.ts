import { gql } from 'apollo-server-express';

export interface ISocial {
  _id?: string;
  icon: string;
  name: string;
  url: string;
}

export const BaseSchemaSocial = gql`
  type Social {
    _id: String
    icon: String!
    name: String!
    url: String!
  }
`;
