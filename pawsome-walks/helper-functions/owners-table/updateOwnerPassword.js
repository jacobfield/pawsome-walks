import { pool } from "../../index.js";

// Create function to update an owner's password in the owners table
//PUT /owners/:ownerId/password
export default async function updateOwnerPassword(ownerId, newPassword) {
  try {
    const updatePasswordQuery = `
      UPDATE owners 
      SET hashedPassword = $1 
      WHERE ownerId = $2 
      RETURNING *`;

    // Use pool object to send query to the database, preventing SQL injection
    const result = await pool.query(updatePasswordQuery, [
      newPassword,
      ownerId,
    ]);

    // The rows property should contain the updated owner information
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error updating owner's password. Error originated in updateOwnerPassword.js. Error: ${error}`
    );
    throw error; // Rethrow the error to handle it at a higher level if needed
  }
}
