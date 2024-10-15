import { pool } from "../../index.js";

export default async function deleteOwnersDogsByDogId(dogId) {
  try {
    if (!dogId) {
      throw new Error("dogId is required.");
    }
    const deleteOwnersDogsByDogId = `DELETE from ownersDogs WHERE dogId = $1 RETURNING *`;
    const result = await pool.query(deleteOwnersDogsByDogId, [dogId]);
    return result.rows[0];
  } catch (error) {
    console.error(
      "Error deleting ownersDogs by dogId. Error originated in deleteOwnersDogsByDogId.js",
      error
    );
    throw error;
  }
}
