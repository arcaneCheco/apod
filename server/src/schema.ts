import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Query {
    me(email: String): String
  }
`;
export default typeDefs;
