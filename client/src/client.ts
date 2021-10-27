import { ApolloClient, gql, HttpLink, ApolloLink, from } from "@apollo/client";
import cache from "./cache";

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
});

const client = new ApolloClient({
  link,
  typeDefs,
  cache,
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
});

export default client;

// function IsLoggedIn() {
//   const { data } = useQuery(IS_LOGGED_IN);
//   useEffect(() => {
//     console.log(data)
//   }, data)
//   return
// }

// const resolvers = {};

// const link = from([authMiddleware, http]);

// const delay = setContext(
//   (request) =>
//     new Promise((success, fail) => {
//       setTimeout(() => {
//         success();
//       }, 800);
//     })
// );

// const link = ApolloLink.from([cors, http]);

// client.query({ query: IS_LOGGED_IN }).then((res) => console.log(res));
