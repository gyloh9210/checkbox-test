require('dotenv').config({path: '../.env'});

import type { Knex } from "knex";
import { env } from "process";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: env.DB_CLIENT,
    connection: {
      host: env.DB_HOST,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

export default config;