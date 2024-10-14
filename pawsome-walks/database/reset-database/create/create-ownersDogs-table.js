import { pool } from "../../../index.js";

// function to create ownersDogs table
export default async function createOwnersDogsTable() {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS ownersDogs(
            ownerId INT NOT NULL,
            dogId INT NOT NULL,
            CONSTRAINT fk_ownerId FOREIGN KEY(ownerId) REFERENCES owners(ownerId),
            CONSTRAINT fk_dogId FOREIGN KEY(dogId) REFERENCES dogs(dogId),
            PRIMARY KEY(ownerId, dogId) -- Composite Primary Key

            )
            `);
    console.log("ownersDogs table created");
  } catch (error) {
    console.error(
      "ownersDogs table not created. Error originated in create-ownersDogs-table.js",
      error
    );
  }
}
