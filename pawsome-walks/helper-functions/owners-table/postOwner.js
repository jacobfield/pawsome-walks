import { pool } from "../../index.js";

// Create function to add a new owner to the owners table
export default async function postOwner(owner) {
  try {
    // Updated INSERT statement to exclude ownerId
    const insertOwner = `INSERT INTO owners (username, email, hashedpassword) VALUES ($1, $2, $3) RETURNING *`;

    // Destructure the owner object to match the expected database column names
    const { username, email, hashedpassword } = owner;

    // Use pool object to send query to the database, preventing SQL injection
    const result = await pool.query(insertOwner, [
      username,
      email,
      hashedpassword,
    ]);

    // Return the newly created owner
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error creating new owner. Error originated in postOwner function. Error: ${error}`
    );
    throw error; // Rethrow the error for handling at a higher level
  }
}
