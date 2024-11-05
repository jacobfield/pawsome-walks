import { pool } from "../../index.js";

export default async function postUploadsDogs({ walkid, picid }) {
  try {
    if (!walkid || !picid) {
      throw new Error("walkid & picid are required");
    }

    const postUploadsDogs = `INSERT INTO uploadsDogs (walkid, picid) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(postUploadsDogs, [walkid, picid]);
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error creating new uploadsDogs row. Error originated in postUploadsDogs.js. Error: ${error}`
    );
    throw error;
  }
}
