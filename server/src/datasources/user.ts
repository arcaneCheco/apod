import { DataSource } from "apollo-datasource";
import Redis from "ioredis";

class UserAPI extends DataSource {
  store: Redis.Redis;
  context: any;
  constructor() {
    super();
    this.store = new Redis();
  }

  initialize(config: any) {
    console.log("initializing");
    this.context = config.context;
  }

  async findOrCreateUser({ username }: any) {
    const isExists = await this.store.hexists(`user:${username}`, "id");
    let user;
    if (isExists) {
      // find and return exisitng user
      const user = await this.store.hgetall(`user:${username}`);
      return user;
    } else {
      // create new user
      const id = await this.store.incr("users.count");
      await this.store.hset(`user:${username}`, {
        // key=user:username, value type is hash
        id,
        username,
        token: Buffer.from(username).toString("base64"),
      });
      user = await this.store.hgetall(`user:${username}`);
    }
    return user;
  }

  async getSavedPods() {
    const { username } = this.context.user;
    // retrieve hash keys
    const hashKeys = await this.store.lrange(`user:${username}.pods`, 0, -1);

    const savedPods: any = [];

    // retrive pods
    for (let i = 0; i < hashKeys.length; i++) {
      const pod = await this.store.hgetall(
        `user:${username}.pods.${hashKeys[i]}`
      );
      savedPods.push(pod);
    }

    return savedPods;
  }
  async addPod({ pod }: any) {
    const { username } = this.context.user;
    const dateHash = Buffer.from(pod.date).toString("base64");

    // add pod hash-key to list
    await this.store.lpush(`user:${username}.pods`, dateHash);

    // create hash from object
    await this.store.hset(`user:${username}.pods.${dateHash}`, {
      ...pod,
    });

    return true;
  }
}

export default new UserAPI();
