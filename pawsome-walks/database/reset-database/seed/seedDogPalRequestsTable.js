import { pool } from "../../../index.js";

export default async function seedDogPalRequestsTable() {
  try {
    await pool.query(`
        INSERT INTO dogPalRequests (senderDogId, receiverDogId)
        VALUES
        (1, 3),
        (3, 2),
        (2, 1);`);

    console.log(`dogPalRequests table has been successfully seeded`);
  } catch (error) {
    console.error(
      "Error seeding dogPalRequests table. Error originated in seedDogPalRequestsTable.js",
      error
    );
    console.error("Error Stack: ", error.stack);
  }
}
