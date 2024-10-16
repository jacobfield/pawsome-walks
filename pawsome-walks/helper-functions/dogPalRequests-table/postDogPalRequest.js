import { pool } from "../../index.js";

export default async function postDogPalRequest({
  senderDogId,
  receiverDogId,
}) {
  try {
    if (senderDogId === receiverDogId) {
      throw new Error("You can't send a dogPal request to yourself!");
    }
    const postDogPalRequest = `INSERT INTO dogPalRequests (senderDogId, receiverDogId)  VALUES ($1, $2) RETURNING *`;

    const result = await pool.query(postDogPalRequest, [
      senderDogId,
      receiverDogId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error creating new dogPalRequest. Error originated in postDogPalRequest.js. Error: ${error}`
    );
    throw error;
  }
}
