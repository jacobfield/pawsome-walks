import { pool } from "../../index.js";

export default async function postUploadsOwners({ ownerId, picId }) {
  try {
    if (!ownerId || !picId) {
      throw new Error("ownerId & picId are required");
    }

    const postUploadsOwners = `INSERT INTO uploadsOwners (ownerId, picId) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(postUploadsOwners, [ownerId, picId]);
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error creating new uploadsOwners row. Error originated in postUploadsOwners.js. Error: ${error}`
    );
    throw error;
  }
}
