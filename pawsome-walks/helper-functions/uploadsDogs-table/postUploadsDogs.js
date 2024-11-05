import { pool } from "../../index.js";

export default async function postUploadsDogs({ walkId, picId }) {
  try {
    if (!walkId || !picId) {
      throw new Error("walkId & picId are required");
    }

    const postUploadsDogs = `INSERT INTO uploadsDogs (walkId, picId) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(postUploadsDogs, [walkId, picId]);
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error creating new uploadsDogs row. Error originated in postUploadsDogs.js. Error: ${error}`
    );
    throw error;
  }
}
