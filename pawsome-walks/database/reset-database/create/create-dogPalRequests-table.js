import { pool } from "../../../index.js";

// Function to create dogPalRequests table
export default async function createDogPalRequestsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS dogPalRequests(
        dogPalRequestId SERIAL PRIMARY KEY,
        senderDogId INT NOT NULL,
        receiverDogId INT NOT NULL,
        status ENUM ('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
        requestDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_senderDogId FOREIGN KEY (senderDogId) REFERENCES dogs(dogId),
        CONSTRAINT fk_receiverDogId FOREIGN KEY (receiverDogId) REFERENCES dogs(dogId),
        CONSTRAINT unique_request UNIQUE (senderDogId, receiverDogId), 
        CONSTRAINT check_different_dogs CHECK (senderDogId != receiverDogId)  -- Ensures sender and receiver are different
      );
    `);
    console.log("dogPalRequests table created");
  } catch (error) {
    console.error(
      "dogPalRequests table not created. Error originated in create-dogPalRequests-table.js",
      error
    );
  }
}
