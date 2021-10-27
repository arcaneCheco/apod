import { InMemoryCache, makeVar } from "@apollo/client";
import Experience from "./Experience";

export const exp = new Experience();

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem("token"));

export default cache;
