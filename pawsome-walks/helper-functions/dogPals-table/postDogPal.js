import { pool } from "../../index.js";

export default async function postDogPal(dogId1, dogId2) {
  try {
    if (dogId1 == dogId2) {
      throw new Error("Dog Ids must be different");
    }
    // endure dogId1 is always less than dogId2
    if (dogId1 > dogId2) {
      [dogId1, dogId2] = [dogId2, dogId1]; // Swap the values
    }
    const postDogPal = `INSERT INTO dogPals (dogId1, dogId2) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(postDogPal, [dogId1, dogId2]);

    return result.rows[0];
  } catch (error) {
    console.error(
      "Error creating new dogPal. Error originated in postDogPal.js",
      error
    );
    throw error;
  }
}
