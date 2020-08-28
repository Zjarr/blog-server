import { gql } from 'apollo-server-express';

import { ISource } from '../../source/schema';

export interface IBlog {
  _id?: string;
  active: boolean;
  body: string;
  categories?: string[];
  created: string;
  description: string;
  image: string;
  name: string;
  slug: string;
  sources?: ISource[];
  updated: string;
}

export const BaseSchemaBlog = gql`
  type Blog {
    _id: String
    active: Boolean!
    body: String!
    categories: [ String ]
    created: String!
    description: String!
    image: String!
    name: String!
    slug: String!
    sources: [ Source ]
    updated: String!
  }
`;
