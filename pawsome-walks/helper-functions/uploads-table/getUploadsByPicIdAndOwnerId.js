import { pool } from "../../index.js";

export default async function getUploadsByPicIdAndOwnerId(ownerId, picId) {
  try {
    const queryUrl = `SELECT * FROM uploads WHERE ownerId = $1 AND picId = $2`;

    const result = await pool.query(queryUrl, [ownerId, picId]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error retrieving uploads. Error originated in getUploadsByPicIdAndOwnerId.js",
      error
    );
    throw error;
  }
}
