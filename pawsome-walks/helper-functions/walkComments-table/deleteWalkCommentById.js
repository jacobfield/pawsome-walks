import { pool } from "../../index.js";

export default async function deleteWalkCommentById(walkCommentId) {
  try {
    if (!walkCommentId) {
      throw new Error("walkCommentId is required.");
    }
    const deleteWalkComment = `DELETE from walkComments WHERE walkCommentId = $1 RETURNING *`;
    const result = await pool.query(deleteWalkComment, [walkCommentId]);
    return result.rows[0];
  } catch (error) {
    console.error(
      "Error deleting walkComment by Id. Error originated in deleteWalkCommentById.js",
      error
    );
    throw error;
  }
}
