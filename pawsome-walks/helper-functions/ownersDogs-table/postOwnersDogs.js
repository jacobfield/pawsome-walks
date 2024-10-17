import { pool } from "../../index.js";

export default async function postOwnersDogs({ ownerId, dogId }) {
  try {
    const postOwnersDogs =
      "INSERT INTO ownersDogs (ownerId, dogId) VALUES ($1, $2) RETURNING *";

    const result = await pool.query(postOwnersDogs, [ownerId, dogId]);

    return result.rows[0];
  } catch (error) {
    console.error(
      "Error creating new ownersDogs. Error originated in postOwnersDogs.js",
      error
    );
    throw error;
  }
}
