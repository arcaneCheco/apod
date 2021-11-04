import { ApolloClient, gql, HttpLink, ApolloLink, from } from "@apollo/client";
import cache from "./cache";
import { savedPodsVar } from "./cache";

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const link = new HttpLink({
  uri: "http://localhost:4000/graphql",
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
});

const client = new ApolloClient({
  link,
  typeDefs,
  cache,
});

export default client;

// init cache for saved pods
const GET_SAVED_PODS = gql`
  query GetSavedPods {
    userPods {
      title
      date
      url
    }
  }
`;

// i Think problem is that this can't be here, query should be made after already authenticed
client
  .query({ query: GET_SAVED_PODS })
  .then((res) => savedPodsVar(res.data.userPods));
