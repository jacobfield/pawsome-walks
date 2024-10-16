import { pool } from "../../index.js";

export default async function deleteDogById(dogId) {
  try {
    const deleteDog = "DELETE FROM dogs WHERE dogId = $1 RETURNING *";

    const result = await pool.query(deleteDog, [dogId]);

    return result.rows[0];
  } catch (error) {
    console.error(
      "Error deleting owner by Id. Error originated in deleteOwnerById.js",
      error
    );
    throw error;
  }
}
