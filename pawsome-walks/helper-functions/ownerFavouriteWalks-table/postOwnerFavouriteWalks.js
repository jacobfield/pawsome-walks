import { pool } from "../../index.js";

export default async function postOwnerFavouriteWalks(data) {
  try {
    const { ownerid, walkid } = data;
    const postOwnerFavouriteWalks =
      "INSERT INTO ownerFavouriteWalks (ownerid, walkid) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(postOwnerFavouriteWalks, [ownerid, walkid]);
    return result.rows[0];
  } catch (error) {
    console.error(
      "Error creating new ownerFavouriteWalks. Error originated in postOwnerFavouriteWalks.js",
      error
    );
    throw error;
  }
}
