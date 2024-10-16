import { pool } from "../../../index.js";

// Function to create ownerFavouriteWalks table
export default async function createOwnerFavouriteWalksTable() {
  try {
    console.log("Creating ownerFavouriteWalks table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ownerFavouriteWalks (
        ownerId INT NOT NULL,
        walkId INT NOT NULL,
        CONSTRAINT fk_ownerId FOREIGN KEY (ownerId) REFERENCES owners(ownerId),
        CONSTRAINT fk_walkId FOREIGN KEY (walkId) REFERENCES walks(walkId),
        PRIMARY KEY (ownerId, walkId)  -- Composite Primary Key
      );
    `);
    console.log("ownerFavouriteWalks table created");
  } catch (error) {
    console.error(
      "ownerFavouriteWalks table not created. Error originated in create-ownerFavouriteWalks-table.js",
      error
    );
  }
}
