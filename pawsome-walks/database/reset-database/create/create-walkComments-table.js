import { pool } from "../../../index.js";

// Function to create walkComments table
export default async function createWalkCommentsTable() {
  try {
    console.log("Creating walkComments table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS walkComments(
        walkCommentId SERIAL PRIMARY KEY,
        walkId INT NOT NULL,
        ownerId INT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        comment TEXT NOT NULL,
        CONSTRAINT fk_walksId FOREIGN KEY (walkId) REFERENCES walks(walkId) ON DELETE CASCADE,
        CONSTRAINT fk_ownerId FOREIGN KEY (ownerId) REFERENCES owners(ownerId) ON DELETE CASCADE
      );
    `);
    console.log("walkComments table created");
  } catch (error) {
    console.error(
      "walkComments table not created. Error originated in create-walkComments-table.js",
      error
    );
  }
}
