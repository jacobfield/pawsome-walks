import { pool } from "../../index.js";

export default async function postDogPalRequest(
  senderDogId,
  receiverDogId,
  status
) {
  try {
    if (senderDogId == receiverDogId) {
      throw new Error("You can't send a dogPal request to yourself!");
    }
    const postDogPalRequest = `INSERT INTO dogPalRequests (senderDogId, receiverDogId, status)  VALUES ($1, $2, $3) RETURNING *`;

    const result = await pool.query(postDogPalRequest, [
      senderDogId,
      receiverDogId,
      status,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error creating new dogPalRequest. Error originated in postDogPalRequest.js. Error: ${error}`
    );
    throw error;
  }
}
