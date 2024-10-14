import { pool } from "../../../index.js";

// function to create the owners table
export default async function createOwnersTable() {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS owners (
            ownerId SERIAL PRIMARY KEY,
            userName TEXT NOT NULL,
            email TEXT NOT NULL,
            hashedPassword TEXT NOT NULL
            )`);
    console.log("owners table created");
  } catch (error) {
    console.error(
      "owners table not created. Error originated in create-owners-table.js",
      error
    );
  }
}
