import { pool } from "../../../index.js";

// Function to create uploadsDogs table
export default async function createUploadsDogsTable() {
  try {
    console.log("Creating uploadsDogs table...");

    // Check if uploads and dogs tables exist
    const uploadsTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'uploads'
      );
    `);
    const dogsTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'dogs'
      );
    `);

    if (!uploadsTableExists.rows[0].exists || !dogsTableExists.rows[0].exists) {
      throw new Error("Required tables (uploads, dogs) do not exist.");
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS uploadsDogs (
        picid INT NOT NULL,
        dogid INT NOT NULL,
        CONSTRAINT fk_picid FOREIGN KEY(picid) REFERENCES uploads(picid) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_dogid FOREIGN KEY(dogid) REFERENCES dogs(dogid) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY(picid, dogid) -- Composite Primary Key
      );
    `);
    console.log("uploadsDogs table created");
  } catch (error) {
    console.error(
      "uploadsDogs table not created. Error originated in create-uploadsDogs-table.js",
      error
    );
    console.error("Error details:", error.message);
  }
}
