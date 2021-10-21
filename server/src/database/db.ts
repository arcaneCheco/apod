import * as pg from "pg";

class DB {
  pool;
  query;
  constructor() {
    this.pool = new pg.Pool({
      user: "apod_user",
      host: "localhost",
      database: "apod",
      password: process.env.DB_WORD,
      port: 5432,
    });
    this.query = "";
  }
  async run(query: string, ...params: any[]): Promise<any> {
    const q = query.toLowerCase().trim();
    const res = await this.pool.query(q, params);
    return res.rows;
  }
}

export default new DB();
