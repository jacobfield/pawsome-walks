import { pool } from "../../index.js";

export default async function deleteDogPalsByBothIds(dogId1, dogId2) {
  try {
    if (!dogId1 || !dogId2) {
      throw new Error("dogId1 and dogId2 are required.");
    }
    const deleteDogPalsByBothIds = `DELETE from dogPals WHERE (dogId1 = $1 AND dogId2 = $2) OR (dogId1 = $2 AND dogId2 = $1) RETURNING *`;
    const result = await pool.query(deleteDogPalsByBothIds, [dogId1, dogId2]);
    return result.rows[0];
  } catch (error) {
    console.error(
      "Error deleting dogPals by both dogIds. Error originated in deleteDogPalsByBothIds.js",
      error
    );
    throw error;
  }
}
