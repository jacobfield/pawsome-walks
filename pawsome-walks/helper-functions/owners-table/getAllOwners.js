import { pool } from "../../index.js";

export default async function getAllOwners() {
  try {
    const queryOwners = "SELECT * FROM owners";
    const result = await pool.query(queryOwners);

    return result.rows;
  } catch (error) {
    console.error(
      "Error retrieving owners. Error originated in getAllOwners.js",
      error
    );
    throw error;
  }
}
