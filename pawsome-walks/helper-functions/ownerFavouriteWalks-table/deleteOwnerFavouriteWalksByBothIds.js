import { pool } from "../../index.js";

export default async function deleteOwnerFavouriteWalksByBothIds(
  ownerId,
  walkId
) {
  try {
    if (!ownerId || !walkId) {
      throw new Error("ownerId and walkId are required.");
    }
    const deleteOwnerFavouriteWalks =
      "DELETE FROM ownerFavouriteWalks WHERE ownerId = $1 AND walkId = $2 RETURNING *";
    const result = await pool.query(deleteOwnerFavouriteWalks, [
      ownerId,
      walkId,
    ]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error deleting ownerFavouriteWalks by ownerId and walkId. Error originated in deleteOwnerFavouriteWalksByOwnerId.js",
      error
    );
    throw error;
  }
}
