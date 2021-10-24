import { InMemoryCache, makeVar } from "@apollo/client";
import Experience from "./Experience";

export const exp = new Experience();
// const newDiv = document.createElement("div");
// const exp = new Experience({ dom: newDiv });
// const exp = new Experience({ dom: document.getElementById("sketch") });

// export const dom = makeVar(null);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // experience: {
        //   read(_, opt) {
        //     console.log("OPT", opt);
        //     return exp;
        //   },
        // },
        // experience: () => {
        //   return exp;
        // },
        experience: {
          read() {
            return exp;
          },
        },
        init: {
          read(_, opt) {
            console.log("from cache", opt);
            // exp.initExperience(args?.dom);
          },
        },
      },
    },
    Mutation: {
      fields: {},
    },
  },
});

export default cache;
