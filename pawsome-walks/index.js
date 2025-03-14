/* eslint-disable no-undef */
//import node-postgres library
import pg from "pg";
// ensure dotenv is loaded
import dotenv from "dotenv";
dotenv.config();
// retrieve the db connection string
const connectionString = process.env.DB_CONNECTION_STRING;

// throw error if no connection string

if (!connectionString) {
  throw new Error("DB connection string not connected. Check env variables.");
}

// export a new pg.pool instance, used to interact with the db
export const pool = new pg.Pool({
  connectionString,
  // passing in the connectionString as the argument
});
