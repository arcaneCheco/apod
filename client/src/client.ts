import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

const typeDefs = gql`
  extend type User {
    age: Int
  }
  extend type Pet {
    vaccinated: Boolean!
  }
`;
const resolvers = {
  User: {
    age() {
      return 35;
    },
  },
  Pet: {
    vaccinated() {
      return true;
    },
  },
};

const link = new HttpLink({ uri: "http://localhost:4000/" });

// const delay = setContext(
//   (request) =>
//     new Promise((success, fail) => {
//       setTimeout(() => {
//         success();
//       }, 800);
//     })
// );

// const link = ApolloLink.from([delay, http]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs,
});

export default client;
