import { gql } from 'apollo-server-express';

export interface ISocial {
  icon: string;
  name: string;
  url: string;
}

export const BaseSchemaSocial = gql`
  type Social {
    icon: String!
    name: String!
    url: String!
  }
`;
