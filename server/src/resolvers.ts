const resolvers = {
  Query: {
    me: () => {
      return "It's a me";
    },
    pods: async (_: any, __: any, { dataSources }: any) => {
      const pods = await dataSources.apodAPI.getData();
      return pods;
    },
    userPods: async (_: any, __: any, { dataSources }: any) => {
      const userPods = await dataSources.userAPI.getSavedPods();
      return userPods;
    },
  },
  Mutation: {
    login: async (_: any, { username }: any, { dataSources }: any) => {
      const user = await dataSources.userAPI.findOrCreateUser({ username });
      return user;
    },
    addPod: async (_: any, { pod }: any, { dataSources }: any) => {
      const res = await dataSources.userAPI.addPod({ pod });
      return res;
    },
  },
};

export default resolvers;
