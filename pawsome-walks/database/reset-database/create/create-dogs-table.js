import { pool } from "../../../index.js";

// function to create dogs table
export async function createDogsTable() {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS dogs(
            dogId SERIAL PRIMARY KEY,
            dogName TEXT NOT NULL,
            ownerId INT NOT NULL,
            breed TEXT NOT NULL,
            age INT NOT NULL,
            colour TEXT NOT NULL,
            favouriteThing TEXT NOT NULL,
            CONSTRAINT fk_ownerId FOREIGN KEY(ownerId) REFERENCES owners(ownerId)
            ON DELETE CASCADE
            )`);
    console.log("dogs table created");
  } catch (error) {
    console.error(
      "dogs table not created. Error originated in create-dogs-table.js",
      error
    );
  }
}
