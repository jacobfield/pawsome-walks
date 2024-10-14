/* eslint-disable no-undef */
//import node-postgres library
import pg from "pg";

// retrieve the db connection string
const connectionString = process.env.DB_CONNECTION_STRING;

// throw error if no connection string

if (!connectionString) {
  throw new error("DB connection string not connected. Check env variables.");
}

// export a new pg.pool instance, used to interact with the db
export const pool = new pg.pool({
  connectionString,
  // passing in the connectionString as the argument
});
