import { pool } from "../../index.js";

export default async function deleteOwnerFavouriteWalksByOwnerId(ownerId) {
  try {
    const deleteOwnerFavouriteWalks =
      "DELETE FROM ownerFavouriteWalks WHERE ownerId = $1 RETURNING *";
    const result = await pool.query(deleteOwnerFavouriteWalks, [ownerId]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error deleting ownerFavouriteWalks by ownerId. Error originated in deleteOwnerFavouriteWalksByOwnerId.js",
      error
    );
    throw error;
  }
}
