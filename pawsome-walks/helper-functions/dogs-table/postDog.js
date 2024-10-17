import { pool } from "../../index.js";

export default async function postDog(dog) {
  try {
    const insertDog = `INSERT INTO dogs (dogName, ownerId, breed, age, colour, favouriteThing) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const { dogName, ownerId, breed, age, colour, favouriteThing } = dog;

    const result = await pool.query(insertDog, [
      dogName,
      ownerId,
      breed,
      age,
      colour,
      favouriteThing,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(
      `Error creating new dog. Error originated in postDog.js. Error: ${error}`
    );
    throw error; // Rethrow the error for handling at a higher level
  }
}
