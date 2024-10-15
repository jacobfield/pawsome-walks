import { pool } from "../../index.js";

export default async function getAllWalks() {
  try {
    const queryWalks = `SELECT * FROM walks`;

    const result = await pool.query(queryWalks);
    return result.rows;
  } catch (error) {
    console.error(
      "Error retrieving walks. Error originated in getWalks.js",
      error
    );
    throw error;
  }
}
