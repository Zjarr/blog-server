import { gql } from 'apollo-server-express';

interface IBlogSourceInput {
  name: string;
  url: string;
}

export interface IBlogInput {
  _id?: string;
  active: boolean;
  body: string;
  categories?: string[];
  description: string;
  image: string;
  name: string;
  slug: string;
  sources?: IBlogSourceInput[];
}

export const MutationSchemaBlog = gql`
  input BlogSourceInput {
    name: String!
    url: String!
  }

  input BlogInput {
    _id: String
    active: Boolean!
    body: String!
    categories: [ String ]
    description: String!
    image: String!
    name: String!
    slug: String!
    sources: [ BlogSourceInput ]
  }

  extend type Mutation {
    blog(blog: BlogInput!): BlogPayload!
  }
`;
