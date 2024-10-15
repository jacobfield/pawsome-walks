import { pool } from "../../index.js";

// Create function to add a new owner to the owners table
export default async function postOwner(owner) {
  try {
    // Updated INSERT statement to exclude ownerId
    const insertOwner = `INSERT INTO owners (userName, email, hashedPassword) VALUES ($1, $2, $3) RETURNING *`;

    // Destructure the owner object, but exclude ownerId
    const { userName, email, hashedPassword } = owner;

    // Use pool object to send query to the database, preventing SQL injection
    const result = await pool.query(insertOwner, [
      userName,
      email,
      hashedPassword,
    ]);

    // The rows property should contain the new owner
    return result.rows[0]; // Return the newly created owner
  } catch (error) {
    console.error(
      `Error creating new owner. Error originated in createOwner.js. Error: ${error}`
    );
    throw error; // Rethrow the error for handling at a higher level
  }
}
