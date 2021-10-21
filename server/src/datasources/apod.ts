import { RESTDataSource } from "apollo-datasource-rest";

class ApodAPI extends RESTDataSource {
  key: string;
  count: Number;
  constructor() {
    super();
    this.key =
      process.env.APOD_KEY || "wApPCM3FuGhJrwEPnbzzaaWEd5yy7Gd0zm4Pd73d";
    this.count = 4;
    this.baseURL = `https://api.nasa.gov/planetary/`;
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
}

export default ApodAPI;
