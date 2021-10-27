import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    token: String
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

  type Mutation {
    login(username: String): User
  }
`;
export default typeDefs;
