import { pool } from "../../index.js";

export default async function getOwnerFavouriteWalksByOwnerId(ownerId) {
  try {
    const queryOwnerFavouriteWalks =
      "SELECT * FROM ownerFavouriteWalks WHERE ownerId = $1";
    const result = await pool.query(queryOwnerFavouriteWalks, [ownerId]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error retrieving ownerFavouriteWalks by ownerId. Error originated in getOwnerFavouriteWalksByOwnerId.js",
      error
    );
    throw error;
  }
}
