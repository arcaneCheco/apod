import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
dotenv.config();
import typeDefs from "./schema";
import resolvers from "./resolvers";
import Redis from "ioredis";
import ApodAPI from "./datasources/apod";
import UserAPI from "./datasources/user";

/**
 * db stuff
 */
const store: Redis.Redis = new Redis();

const userAPI = new UserAPI({ store });
const apodAPI = new ApodAPI({ store });

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const token = (req.headers && req.headers.authorization) || "";
    const username = Buffer.from(token, "base64").toString("ascii");
    // do some kind of username validation, no spaces etc.
    // if (!username) {
    //   console.log("not authorized");
    //   return { user: null };
    // } else {
    //   console.log("aall good");
    // }
    // find a user by their username
    const user = await userAPI.findOrCreateUser({ username });

    return { user };
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    // apodAPI: new ApodAPI(),
    apodAPI,
    userAPI,
  }),
  cors: {
    origin: "*",
    credentials: true,
  },
});

server.listen(PORT).then(() => {
  console.log("listening on port 4000");
});

// new ApodAPI();

// const startServer = async () => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     dataSources: () => ({
//       apodAPI: new ApodAPI(),
//     }),
//   });
//   await server.start();
//   const app = express();
//   const corsOptions = {
//     origin: "*",
//     credentials: true, // <-- REQUIRED backend setting
//   };
//   app.use(cors(corsOptions));
//   server.applyMiddleware({ app });
//   app.listen(PORT, () => {
//     console.log("listening on port 4000");
//   });
// };

// startServer();
