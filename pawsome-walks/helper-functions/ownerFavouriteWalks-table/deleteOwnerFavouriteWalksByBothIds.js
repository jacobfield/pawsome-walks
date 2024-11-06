import { pool } from "../../index.js";

export default async function deleteOwnerFavouriteWalksByBothIds(
  ownerid,
  walkid
) {
  try {
    if (!ownerid || !walkid) {
      throw new Error("ownerid and walkid are required.");
    }
    const deleteOwnerFavouriteWalks =
      "DELETE FROM ownerFavouriteWalks WHERE ownerid = $1 AND walkid = $2 RETURNING *";
    const result = await pool.query(deleteOwnerFavouriteWalks, [
      ownerid,
      walkid,
    ]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error deleting ownerFavouriteWalks by ownerid and walkid. Error originated in deleteOwnerFavouriteWalksByOwnerId.js",
      error
    );
    throw error;
  }
}
