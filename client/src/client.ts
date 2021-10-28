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

const GET_SAVED_PODS = gql`
  query GetSavedPods {
    userPods {
      title
    }
  }
`;

// client
//   .query({ query: GET_SAVED_PODS })
//   .then((res) => console.log("savedPods: ", res));

const pod = {
  date: "2007-12-28",
  explanation:
    "A recent the trl galajoral bar region, about a third of the way in from the Milky Way's outer edge.",
  title: "Barred Spiral Milky Way MOD",
  url: "https://apod.nasa.gov/apod/image/0508/MWart_spitzer_c42.jpg",
};

const ADD_POD = gql`
  mutation AddPod($POD: POD) {
    addPod(POD: $POD)
  }
`;
// client.mutate({ mutation: ADD_POD, variables: { pod } }).then((res) => {
//   if (res) {
//     console.log("added pod");
//   } else {
//     console.log("something went wrong");
//   }
// });

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
