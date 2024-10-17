import { pool } from "../../../index.js";

// Function to create walkComments table
export default async function createWalkCommentsTable() {
  try {
    console.log("Creating walkComments table...");

    // Check if walks and owners tables exist
    const walksTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'walks'
      );
    `);
    const ownersTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'owners'
      );
    `);

    if (!walksTableExists.rows[0].exists || !ownersTableExists.rows[0].exists) {
      throw new Error("Required tables (walks, owners) do not exist.");
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS walkComments(
        walkCommentId SERIAL PRIMARY KEY,
        walkId INT NOT NULL,
        ownerId INT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        comment TEXT NOT NULL,
        CONSTRAINT fk_walksId FOREIGN KEY (walkId) REFERENCES walks(walkId) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_ownerId FOREIGN KEY (ownerId) REFERENCES owners(ownerId) ON UPDATE CASCADE ON DELETE CASCADE
      );
    `);
    console.log("walkComments table created");
  } catch (error) {
    console.error(
      "walkComments table not created. Error originated in create-walkComments-table.js",
      error
    );
    console.error("Error details:", error.message);
  }
}
