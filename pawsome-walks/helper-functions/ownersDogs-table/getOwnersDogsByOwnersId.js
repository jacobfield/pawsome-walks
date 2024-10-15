import { pool } from "../../index.js";

export default async function getOwnersDogsByOwnersId(ownerId) {
  try {
    const getOwnersDogs = `SELECT * FROM ownersDogs WHERE ownerId = $1`;
    const result = await pool.query(getOwnersDogs, [ownerId]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error fetching ownersDogs by ownerId. Error originated in deleteOwngetOwnersDogsByOwnersIderById.js",
      error
    );
    throw error;
  }
}
