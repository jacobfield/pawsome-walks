import { pool } from "../../index.js";

export default async function getUploadsByPicIdAndWalkId(walkId, picId) {
  try {
    const queryUrl = `SELECT * FROM uploads WHERE walkId = $1 AND picId = $2`;

    const result = await pool.query(queryUrl, [walkId, picId]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error retrieving uploads. Error originated in getUploadsByPicIdAndWalkId.js",
      error
    );
    throw error;
  }
}
