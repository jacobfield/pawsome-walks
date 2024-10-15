import { pool } from "../../index.js";

export default async function postWalkComments(walkId, ownerId, comment) {
  try {
    if (!walkId || !ownerId || !comment) {
      throw new Error(
        "walkId, ownerId and comment are required to post a comment"
      );
    }

    const postWalkComments = `INSERT INTO walkComments (walkId, ownerId, comment) VALUES ($1, $2, $3) RETURNING *`;
    const result = await pool.query(postWalkComments, [
      walkId,
      ownerId,
      comment,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error creating new walkComment. Error originated in postWalkComments.js. Error: ${error}`
    );
    throw error;
  }
}
