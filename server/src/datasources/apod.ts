import { RESTDataSource } from "apollo-datasource-rest";
import Redis from "ioredis";

class ApodAPI extends RESTDataSource {
  key: string;
  count: Number;
  store: Redis.Redis;
  constructor({ store }: any) {
    super();
    this.key =
      process.env.APOD_KEY || "wApPCM3FuGhJrwEPnbzzaaWEd5yy7Gd0zm4Pd73d";
    this.count = 4;
    this.baseURL = `https://api.nasa.gov/planetary/`;
    // this.store = new Redis();
    this.store = store;
  }

  async getData() {
    try {
      const response = await this.get(
        `apod?api_key=${this.key}&count=${this.count}`
      );
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async populateDB() {
    try {
      const response = await this.get(`apod?api_key=${this.key}&count=${50}`);
      const podsForCaching: any = [];
      response.forEach((pod: any) => {
        if (pod.media_type === "image") {
          podsForCaching.push({
            title: pod.title,
            explanation: pod.explanation,
            url: pod.url,
            date: pod.date,
          });
        }
      });
      return podsForCaching;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ApodAPI;
// export default new ApodAPI();
