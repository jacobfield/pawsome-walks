import { pool } from "../../index.js";

export default async function postUploadsOwners({ ownerid, picid }) {
  try {
    if (!ownerid || !picid) {
      throw new Error("ownerid & picid are required");
    }

    const postUploadsOwners = `INSERT INTO uploadsOwners (ownerid, picid) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(postUploadsOwners, [ownerid, picid]);
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error creating new uploadsOwners row. Error originated in postUploadsOwners.js. Error: ${error}`
    );
    throw error;
  }
}
