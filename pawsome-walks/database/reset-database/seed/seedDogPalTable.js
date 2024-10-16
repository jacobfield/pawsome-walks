import { pool } from "../../../index.js";

export default async function seedDogPalTable() {
  try {
    await pool.query(`          
    INSERT INTO dogPals (dogId1, dogId2)
    VALUES
    (1, 2),
    (1, 3),
    (2, 3);`);

    console.log(`dogPals table has been successfully seeded`);
  } catch (error) {
    console.error(
      "Error seeding dogPal table. Error originated in seedDogPalTable.js",
      error
    );
    console.error("Error Stack: ", error.stack);
  }
}
