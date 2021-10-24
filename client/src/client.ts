import { ApolloClient, gql, HttpLink, ApolloLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import cache from "./cache";

// const typeDefs = gql``;

// const resolvers = {};

const link = new HttpLink({
  uri: "http://localhost:4000/graphql",
  // credentials: "include",
  // credentials: "same-origin",
  fetch,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || null,
      // AccessControlAllowOrigin: "*",
    },
  }));

  return forward(operation);
});

// const link = from([authMiddleware, http]);

// const delay = setContext(
//   (request) =>
//     new Promise((success, fail) => {
//       setTimeout(() => {
//         success();
//       }, 800);
//     })
// );

// const cors = setContext(() => {
//   return { fetchOptions: { mode: "no-cors" } };
// });

// const link = ApolloLink.from([cors, http]);

const client = new ApolloClient({
  link,
  cache,
});

export default client;
