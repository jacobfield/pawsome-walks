import { pool } from "../../index.js";

export default async function getUploadsByPicIdAndDogId(dogId, picId) {
  try {
    const queryUrl = `SELECT * FROM uploads WHERE dogId = $1 AND picId = $2`;

    const result = await pool.query(queryUrl, [dogId, picId]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error retrieving uploads. Error originated in getUploadsByPicIdAndDogId.js",
      error
    );
    throw error;
  }
}
//
