import { pool } from "../../index.js";

export default async function getDogById(dogId) {
  try {
    const queryDogs = `SELECT * FROM dogs WHERE dogId = $1`;

    const result = await pool.query(queryDogs, [dogId]);
    return result.rows[0];
  } catch (error) {
    console.error(
      "Error retrieving dog by Id. Error originated in getDogById.js",
      error
    );
    throw error;
  }
}
