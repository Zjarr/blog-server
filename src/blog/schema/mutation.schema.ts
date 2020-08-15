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
  slug: string;
  sources?: IBlogSourceInput[];
  title: string;
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
    slug: String!
    sources: [ BlogSourceInput ]
    title: String!
  }

  extend type Mutation {
    blog(blog: BlogInput!): BlogPayload!
  }
`;
