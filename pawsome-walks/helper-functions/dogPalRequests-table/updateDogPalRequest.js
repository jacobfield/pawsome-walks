import { pool } from "../../index.js";

export default async function updateDogPalRequest(dogPalRequestId, newStatus) {
  try {
    if (!dogPalRequestId) {
      throw new Error("DogPalRequestId is required.");
    }
    if (!newStatus || !["accepted", "rejected"].includes(newStatus)) {
      throw new Error("newStatus must be 'accepted' or 'rejected'.");
    }

    const updateDogPalRequest = `UPDATE dogPalRequests SET status = $2 WHERE dogPalRequestId = $1 RETURNING *`;
    const result = await pool.query(updateDogPalRequest, [
      dogPalRequestId,
      newStatus,
    ]);
    if (result.rowCount === 0) {
      throw new Error(
        `No request found with dogPalRequestId: ${dogPalRequestId}`
      );
    }

    return result.rows[0];
  } catch (error) {
    console.error(
      "Error updating dogPalRequest. Error originated in updateDogPalRequest.js",
      { dogPalRequestId, newStatus, error }
    );
    throw error;
  }
}
