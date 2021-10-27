const resolvers = {
  Query: {
    me: () => {
      return "It's a me";
    },
    pods: async (_: any, __: any, { dataSources }: any) => {
      const pods = await dataSources.apodAPI.getData();
      return pods;
    },
  },
  Mutation: {
    login: async (_: any, { username }: any, { dataSources }: any) => {
      const user = await dataSources.userAPI.findOrCreateUser({ username });
      return user;
    },
  },
};

export default resolvers;
