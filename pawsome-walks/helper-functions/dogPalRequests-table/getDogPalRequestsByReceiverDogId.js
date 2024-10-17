import { pool } from "../../index.js";

export default async function getDogPalRequestsByReceiverDogId(receiverDogId) {
  try {
    if (!receiverDogId) {
      throw new Error("receiverDogId is required.");
    }

    const dogPalRequestsQuery = `SELECT * FROM dogPalRequests WHERE receiverDogId = $1`;

    const result = await pool.query(dogPalRequestsQuery, [receiverDogId]);
    return result.rows;
  } catch (error) {
    console.error(
      "Error fetching dogPalRequests by receiverDogId. Error originated in getDogPalRequestsByReceiverDogId.js",
      error
    );
    throw error;
  }
}
