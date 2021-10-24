import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }
  type POD {
    copyright: String
    date: String
    explanation: String
    title: String
    url: String
  }

  type Query {
    me(email: String): String
    pods: [POD]!
  }
`;
export default typeDefs;
