import { pool } from "../../../index.js";

export default async function alterTablesAddingFK() {
  try {
    console.log(
      "Altering ownersDogs and walkComments tables to add foreign key relationships."
    );

    await pool.query(`ALTER TABLE IF EXISTS ownersDogs
            ADD CONSTRAINT foreign_key_ownerId
            FOREIGN KEY(ownerId) REFERENCES owners(ownerId)
            ON UPDATE CASCADE ON DELETE CASCADE,
            ADD CONSTRAINT foreign_key_dogId
            FOREIGN KEY(dogId) REFERENCES dogs(dogId)
            ON UPDATE CASCADE ON DELETE CASCADE           
            ;`);

    await pool.query(`ALTER TABLE IF EXISTS walkComments
            ADD CONSTRAINT foreign_key_walkId_walkComments 
            FOREIGN KEY(walkId) REFERENCES walks(walkId)
            ON UPDATE CASCADE ON DELETE CASCADE,
            ADD CONSTRAINT foreign_key_ownerId_walkComments
            FOREIGN KEY(ownerId) REFERENCES owners(ownerId)
            ON UPDATE CASCADE ON DELETE CASCADE
            ;`);
    console.log(
      "Foreign key relationships added to ownersDogs and walkComments tables."
    );
  } catch (error) {
    console.error(
      "Foreign key relationships NOT added to ownersDogs and walkComments tables. Error originated in alterTablesAddingFK.js",
      error
    );
    console.error("Error details:", error.message, error.stack);
  }
}
