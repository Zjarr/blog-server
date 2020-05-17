import { gql } from 'apollo-server-express';

import { Source } from '../../source/schema';

export interface Blog {
  active: boolean;
  author: string;
  body: string;
  categories?: string[];
  collaborators?: string[];
  created: string;
  description: string;
  keywords?: string[];
  slug: string;
  sources?: Source[];
  title: string;
  updated: string;
}

export const BaseSchemaBlog = gql`
  type Blog {
    active: Boolean!
    author: String!
    body: String!
    categories: [ String ]
    collaborators: [ String ]
    created: String!
    description: String!
    keywords: [ String ]
    slug: String!
    sources: [ Source ]
    title: String!
    updated: String!
  }
`;
