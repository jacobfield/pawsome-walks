import { pool } from "../../index.js";

// Create function to update a dog object in the dogs table
// PATCH /dogs/:dogId
export default async function patchDogById(
  dogId,
  { dogName, breed, age, colour, favouriteThing }
) {
  try {
    // Correct SQL syntax for UPDATE
    const updateDogQuery = `
      UPDATE dogs 
      SET dogName = $2, breed = $3, age = $4, colour = $5, favouriteThing = $6 
      WHERE id = $1 
      RETURNING *;`;

    // Use pool object to send query to the database, preventing SQL injection
    const result = await pool.query(updateDogQuery, [
      dogId, // dogId should be the first parameter
      dogName,
      breed,
      age,
      colour,
      favouriteThing,
    ]);

    // The rows property should contain the updated dog information
    return result.rows[0]; // Return the updated dog object
  } catch (error) {
    console.error(
      `Error updating dog object. Error originated in patchDogById.js. Error: ${error}`
    );
    throw error;
  }
}
