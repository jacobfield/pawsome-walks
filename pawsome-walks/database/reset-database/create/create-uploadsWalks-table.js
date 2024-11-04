import { pool } from "../../../index.js";

// Function to create uploadsWalks table
export default async function createUploadsWalksTable() {
  try {
    console.log("Creating uploadsWalks table...");

    // Check if uploads and walks tables exist
    const uploadsTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'uploads'
      );
    `);
    const walksTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'walks'
      );
    `);

    if (
      !uploadsTableExists.rows[0].exists ||
      !walksTableExists.rows[0].exists
    ) {
      throw new Error("Required tables (uploads, walks) do not exist.");
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS uploadsWalks (
        picid INT NOT NULL,
        walkid INT NOT NULL,
        CONSTRAINT fk_picid FOREIGN KEY(picid) REFERENCES uploads(picid) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_walkid FOREIGN KEY(walkid) REFERENCES walks(walkid) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY(picid, walkid) -- Composite Primary Key
      );
    `);
    console.log("uploadsWalks table created");
  } catch (error) {
    console.error(
      "uploadsWalks table not created. Error originated in create-uploadsWalks-table.js",
      error
    );
    console.error("Error details:", error.message);
  }
}
