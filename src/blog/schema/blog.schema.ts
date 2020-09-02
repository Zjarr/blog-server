import { gql } from 'apollo-server-express';

import { ISource } from '../../source/schema';

export interface IBlog {
  _id?: string;
  active: boolean;
  body: string;
  categories?: string[];
  created: Date;
  description: string;
  image: string;
  name: string;
  slug: string;
  sources?: ISource[];
  updated: Date;
}

export const BaseSchemaBlog = gql`
  type Blog {
    _id: String
    active: Boolean!
    body: String!
    categories: [ String ]
    created: Date!
    description: String!
    image: String!
    name: String!
    slug: String!
    sources: [ Source ]
    updated: Date!
  }
`;
