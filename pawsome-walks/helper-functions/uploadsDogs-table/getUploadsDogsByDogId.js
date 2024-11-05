import { pool } from "../../index.js";

export default async function getUploadsDogsByDogId(dogId) {
  try {
    if (!dogId) {
      throw new Error("dogId is required.");
    }

    const uploadsDogsQuery = `SELECT * FROM uploadsDogs WHERE dogId = $1`;
    const result = await pool.query(uploadsDogsQuery, [dogId]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error fetching uploadsDogs by dogId. Error originated in getUploadsDogsByDogId.js",
      error
    );
    throw error;
  }
}
