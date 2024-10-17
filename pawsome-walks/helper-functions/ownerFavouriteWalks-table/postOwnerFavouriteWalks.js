import { pool } from "../../index.js";

export default async function postOwnerFavouriteWalks({ ownerId, walkId }) {
  try {
    const postOwnerFavouriteWalks =
      "INSERT INTO ownerFavouriteWalks (ownerId, walkId) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(postOwnerFavouriteWalks, [ownerId, walkId]);
    return result.rows[0];
  } catch (error) {
    console.error(
      "Error creating new ownerFavouriteWalks. Error originated in postOwnerFavouriteWalks.js",
      error
    );
    throw error;
  }
}
