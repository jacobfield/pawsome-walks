import { pool } from "../../index.js";

export default async function getDogPals(dogId) {
  try {
    const queryDogPals = `SELECT * FROM dogPals WHERE dogId1 = $1 OR dogId2 = $1`;

    const result = await pool.query(queryDogPals, [dogId]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error retrieving dog pals. Error originated in getDogPals.js",
      error
    );
    throw error;
  }
}
