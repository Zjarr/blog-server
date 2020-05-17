import { gql } from 'apollo-server-express';

interface SourceInput {
  name: string;
  url: string;
}

export interface BlogInput {
  _id?: string;
  active: boolean;
  author: string;
  body: string;
  categories?: string[];
  collaborators?: string[];
  description: string;
  keywords?: string[];
  slug: string;
  sources?: SourceInput[];
  title: string;
}

export const MutationSchemaBlog = gql`
  input SourceInput {
    name: String!
    url: String!
  }

  input BlogInput {
    _id: String
    active: Boolean!
    author: String!
    body: String!
    categories: [ String ]
    collaborators: [ String ]
    description: String!
    keywords: [ String ]
    slug: String!
    sources: [ SourceInput ]
    title: String!
  }

  extend type Mutation {
    blog(blog: BlogInput!): BlogPayload!
  }
`;
