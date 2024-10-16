import { pool } from "../../index.js";

export default async function deleteOwnerById(id) {
  try {
    // Corrected DELETE query without the asterisk
    const deleteOwner = "DELETE FROM owners WHERE ownerId = $1 RETURNING *";
    // Using RETURNING * to get the deleted owner's info
    const result = await pool.query(deleteOwner, [id]);

    // Return the deleted owner's data
    return result.rows[0];
  } catch (error) {
    console.error(
      "Error deleting owner by Id. Error originated in deleteOwnerById.js",
      error
    );
    throw error;
  }
}
