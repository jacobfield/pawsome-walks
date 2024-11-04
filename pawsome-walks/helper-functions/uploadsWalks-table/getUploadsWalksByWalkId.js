import { pool } from "../../index.js";

export default async function getUploadsWalksByWalkId(walkId) {
  try {
    if (!walkId) {
      throw new Error("walkId is required.");
    }

    const uploadsWalksQuery = `SELECT * FROM uploadsWalks WHERE walkId = $1`;
    const result = await pool.query(uploadsWalksQuery, [walkId]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error fetching uploadsWalks by walkId. Error originated in getUploadsWalksByWalkId.js",
      error
    );
    throw error;
  }
}
