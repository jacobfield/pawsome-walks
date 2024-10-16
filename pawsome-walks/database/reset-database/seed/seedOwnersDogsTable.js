import { pool } from "../../../index.js";

export default async function seedOwnersDogsTable() {
  try {
    await pool.query(`
          INSERT INTO ownersDogs (ownerId, dogId)
          VALUES 
          (1, 1),
          (2, 2),
          (3, 3);`);

    console.log(`ownersDogs table has been successfully seeded`);
  } catch (error) {
    console.error(
      "Error seeding ownersDogs table. Error originated in seedOwnersDogsTable.js",
      error
    );
    console.error("Error Stack: ", error.stack);
  }
}
