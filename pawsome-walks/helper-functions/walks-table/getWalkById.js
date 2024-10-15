import { pool } from "../../index.js";

export default async function getWalksById(walkId) {
  try {
    const queryWalks = `SELECT * FROM walks WHERE walkId = $1`;

    const result = await pool.query(queryWalks, [walkId]);
    return result.rows[0];
  } catch (error) {
    console.error(
      "Error retrieving walks. Error originated in getWalksById.js",
      error
    );
    throw error;
  }
}
