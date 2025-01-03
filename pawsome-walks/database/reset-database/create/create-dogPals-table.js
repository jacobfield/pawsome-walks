import { pool } from "../../../index.js";
// function to create the dogPals table

export default async function createDogPalsTable() {
  try {
    console.log("Creating dogPals table...");
    await pool.query(`
        CREATE TABLE IF NOT EXISTS dogPals(
        palId SERIAL PRIMARY KEY,
        dogId1 INT NOT NULL,
        dogId2 INT NOT NULL,
        CONSTRAINT fk_dogId1 FOREIGN KEY(dogId1) REFERENCES dogs(dogId)
        ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_dogId2 FOREIGN KEY(dogId2) REFERENCES dogs(dogId)
        ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT check_unique_friendship CHECK (dogId1 < dogId2),
        CONSTRAINT unique_friendship UNIQUE (dogId1, dogId2)
        )
        `);
    console.log("dogPals table created");
  } catch (error) {
    console.error(
      "dogPals table not created. Error originated in create-dogPals-table.js",
      error
    );
  }
}
