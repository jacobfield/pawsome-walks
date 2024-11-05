import { pool } from "../../../index.js";

// Function to create uploadsOwners table
export default async function createUploadsOwnersTable() {
  try {
    console.log("Creating uploadsOwners table...");

    // Check if uploads and owners tables exist
    const uploadsTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'uploads'
      );
    `);
    const ownersTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'owners'
      );
    `);

    if (
      !uploadsTableExists.rows[0].exists ||
      !ownersTableExists.rows[0].exists
    ) {
      throw new Error("Required tables (uploads, owners) do not exist.");
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS uploadsOwners (
        picid INT NOT NULL,
        ownerid INT NOT NULL,
        CONSTRAINT fk_picid FOREIGN KEY(picid) REFERENCES uploads(picid) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_ownerid FOREIGN KEY(ownerid) REFERENCES owners(ownerid) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY(picid, ownerid) -- Composite Primary Key
      );
    `);
    console.log("uploadsOwners table created");
  } catch (error) {
    console.error(
      "uploadsOwners table not created. Error originated in create-uploadsOwners-table.js",
      error
    );
    console.error("Error details:", error.message);
  }
}
