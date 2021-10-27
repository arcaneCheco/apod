import { DataSource } from "apollo-datasource";
// import { Redis } from "ioredis";
import Redis from "ioredis";

class UserAPI extends DataSource {
  store: Redis.Redis;
  context: any;
  constructor() {
    super();
    this.store = new Redis();
    // this.test();
    // this.createUser({ username: "hello3" });
  }

  initialize(config: any) {
    this.context = config.context;
  }

  test() {
    this.store.get("num").then((res: any) => console.log(res));
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
        id,
        username,
        token: Buffer.from(username).toString("base64"),
      });
      user = await this.store.hgetall(`user:${username}`);
    }
    return user;
  }
}

export default new UserAPI();
