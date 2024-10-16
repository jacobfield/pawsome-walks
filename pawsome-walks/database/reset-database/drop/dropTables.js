import { pool } from "../../../index.js";

export default async function dropTables() {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS 
        ownersDogs, 
        ownerFavouriteWalks, 
        walkComments, 
        dogPalRequests, 
        dogPals, 
        walks, 
        dogs, 
        owners
        CASCADE;
    `);
    console.log("Tables dropped successfully.");
  } catch (error) {
    console.error(
      "Error dropping tables. Error originated in dropTables.js:",
      error
    );
  }
}
