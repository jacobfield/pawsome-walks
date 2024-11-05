import { pool } from "../../index.js";

export default async function postUploadsWalks({ walkid, picid }) {
  try {
    if (!walkid || !picid) {
      throw new Error("walkId & picId are required");
    }

    const postUploadsWalks = `INSERT INTO uploadsWalks (walkid, picid) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(postUploadsWalks, [walkid, picid]);
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error creating new uploadsWalks row. Error originated in postUploadsWalks.js. Error: ${error}`
    );
    throw error;
  }
}
