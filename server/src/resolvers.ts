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
};

export default resolvers;
