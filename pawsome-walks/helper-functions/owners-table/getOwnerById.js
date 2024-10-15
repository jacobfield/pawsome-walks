import { pool } from "../../index.js";

export default async function getOwnerById(id) {
  try {
    const queryOwners = "SELECT * FROM owners WHERE ownerId = $1";

    const result = await pool.query(queryOwners, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(
      "Error retrieving owner by Id. Error originated in getOwnerById.js",
      error
    );
    throw error;
  }
}
