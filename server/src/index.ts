// import { ApolloServer } from "apollo-server";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import ApodAPI from "./datasources/apod";

const PORT = process.env.PORT || 4000;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   dataSources: () => ({
//     apodAPI: new ApodAPI(),
//   }),
//   cors: {
//     origin: "*",
//     // origin: "http://localhost:3000",
//     credentials: true,
//     allowedHeaders: [
//       "Access-Control-Allow-Origin",
//       "content-type",
//       "Origin, X-Requested-With, Content-Type, Accept",
//       "Access-Control-Allow-Headers",
//     ],
//   },
// });

// server.listen(PORT).then(() => {
//   console.log("listening on port 4000");
// });

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      apodAPI: new ApodAPI(),
    }),
  });
  await server.start();
  const app = express();
  const corsOptions = {
    origin: "*",
    // origin: "http://localhost:3000",
    // methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    // preflightContinue: false,
    // allowedHeaders: ["Content-Type", "Origin", "X-Requested-With", "Accept"],
    credentials: true, // <-- REQUIRED backend setting
  };
  app.use(cors(corsOptions));
  // server.applyMiddleware({ app, cors: false, path: "/graphql" });
  server.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log("listening on port 4000");
  });
};

startServer();
