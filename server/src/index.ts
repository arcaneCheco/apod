import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
dotenv.config();
import typeDefs from "./schema";
import resolvers from "./resolvers";
import ApodAPI from "./datasources/apod";

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    apodAPI: new ApodAPI(),
  }),
});

server.listen(PORT).then(() => console.log("listening on port 4000"));
