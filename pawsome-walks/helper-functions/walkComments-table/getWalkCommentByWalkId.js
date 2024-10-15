import { pool } from "../../index.js";

export default async function getWalkCommentsByWalkId(walkId) {
  try {
    if (!walkId) {
      throw new Error("walkId is required.");
    }

    const walkCommentQuery = `SELECT * FROM walkComments WHERE walkId = $1`;
    const result = await pool.query(walkCommentQuery, [walkId]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error fetching walkComments by walkId. Error originated in getWalkCommentByWalkId.js",
      error
    );
    throw error;
  }
}
