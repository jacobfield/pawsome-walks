import { pool } from "../../database/index.js";

export default async function dropTables() {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS 
        ownerFavouriteWalks, 
        walksCommentsTable, 
        dogPalRequests, 
        dogPals, 
        ownerDogs, 
        walks, 
        dogs, 
        owners
    `);
    console.log("Tables dropped successfully.");
  } catch (error) {
    console.error(
      "Error dropping tables. Error originated in dropTables.js:",
      error
    );
  }
}
