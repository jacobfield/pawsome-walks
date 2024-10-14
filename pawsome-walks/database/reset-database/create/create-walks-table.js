import { pool } from "../../../index.js";

// function to create the walks table
export async function createWalksTable() {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS walks(
        walkId SERIAL PRIMARY KEY,
        photoPath TEXT NOT NULL,
        location TEXT NOT NULL,
        lat DECIMAL(9, 6) NOT NULL,
        lng DECIMAL(9, 6) NOT NULL,
        walkType TEXT[] NOT NULL,
        offLeadAreas BOOLEAN NOT NULL DEFAULT FALSE,
        paths BOOLEAN NOT NULL DEFAULT FALSE,
        animalsOnRoute BOOLEAN NOT NULL DEFAULT FALSE,
        toilets BOOLEAN NOT NULL DEFAULT FALSE,
        waterOnRoute BOOLEAN NOT NULL DEFAULT FALSE,
        scenic BOOLEAN NOT NULL DEFAULT FALSE,
        parking ENUM ('free', 'paid', 'none') NOT NULL
        )
        `);
    console.log("walks table created");
  } catch (error) {
    console.error(
      "walks table not created. Error originated in create-walks-table.js",
      error
    );
    
  }
}
