import { pool } from "../../index.js";

export default async function getUploadsOwnersByOwnerId(ownerId) {
  try {
    if (!ownerId) {
      throw new Error("ownerId is required.");
    }

    const uploadsOwnersQuery = `SELECT * FROM uploadsOwners WHERE ownerId = $1`;
    const result = await pool.query(uploadsOwnersQuery, [ownerId]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error fetching uploadsOwners by ownerId. Error originated in getUploadsOwnersByOwnerId.js",
      error
    );
    throw error;
  }
}
