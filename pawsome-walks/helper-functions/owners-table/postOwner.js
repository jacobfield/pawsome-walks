import { pool } from "../../index.js";

// create function to add a new owner to the owners table

export default async function postOwner(owner) {
  try {
    const insertOwner = `INSERT INTO owners (ownerId, userName, email, hashedPassword) VALUES ($1, $2, $3, $4) RETURNING *`;
    // destructure the owner object
    const { ownerId, userName, email, hashedPassword } = owner;

    // use pool object to send query to the database, preventing SQL injection
    const result = await pool.query(insertOwner, [
      ownerId,
      userName,
      email,
      hashedPassword,
    ]);
    // the rows property should contain the new owner
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error creating new owner. Error originated in createOwner.js. Error: ${error}`
    );
    throw error;
  }
}
