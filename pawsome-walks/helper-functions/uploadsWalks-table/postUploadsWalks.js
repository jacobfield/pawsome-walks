import { pool } from "../../index.js";

export default async function postUploadsWalks({ walkId, picId }) {
  try {
    if (!walkId || !picId) {
      throw new Error("walkId & picId are required");
    }

    const postUploadsWalks = `INSERT INTO uploadsWalks (walkId, picId) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(postUploadsWalks, [walkId, picId]);
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error creating new uploadsWalks row. Error originated in postUploadsWalks.js. Error: ${error}`
    );
    throw error;
  }
}
