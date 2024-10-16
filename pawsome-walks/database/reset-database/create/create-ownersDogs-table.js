import { pool } from "../../../index.js";

// function to create ownersDogs table
export default async function createOwnersDogsTable() {
  try {
    console.log("Creating ownersDogs table...");

    // Check if owners and dogs tables exist
    const ownersTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'owners'
      );
    `);
    const dogsTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'dogs'
      );
    `);

    if (!ownersTableExists.rows[0].exists || !dogsTableExists.rows[0].exists) {
      throw new Error("Required tables (owners, dogs) do not exist.");
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ownersDogs (
        ownerId INT NOT NULL,
        dogId INT NOT NULL,
        CONSTRAINT fk_ownerId FOREIGN KEY(ownerId) REFERENCES owners(ownerId) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_dogId FOREIGN KEY(dogId) REFERENCES dogs(dogId) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY(ownerId, dogId) -- Composite Primary Key
      );
    `);
    console.log("ownersDogs table created");
  } catch (error) {
    console.error(
      "ownersDogs table not created. Error originated in create-ownersDogs-table.js",
      error
    );
    console.error("Error details:", error.message);
  }
}
