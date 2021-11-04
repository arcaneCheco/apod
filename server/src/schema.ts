import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    token: String
    pods: [POD]!
  }
  type POD {
    copyright: String
    date: String
    explanation: String
    title: String
    url: String
  }

  input PODInput {
    explanation: String
    copyright: String
    date: String
    title: String
    url: String
  }

  type Query {
    me(email: String): String
    pods: [POD]!
    userPods: [POD]!
    podsForCaching: [POD]!
  }

  type Mutation {
    login(username: String): User
    addPod(pod: PODInput): Boolean
  }
`;
export default typeDefs;
