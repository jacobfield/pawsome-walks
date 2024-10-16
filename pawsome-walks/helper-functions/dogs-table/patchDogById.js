import { pool } from "../../index.js";

// Create function to update a dog object in the dogs table
// PATCH /dogs/:dogId
export default async function patchDogById(
  dogId,
  { dogName, breed, age, colour, favouriteThing }
) {
  try {
    const patchDog = `
      UPDATE dogs 
      SET dogName = $2, breed = $3, age = $4, colour = $5, favouriteThing = $6 
      WHERE dogId = $1 
      RETURNING *;
    `;

    // Use pool object to send query to the database, preventing SQL injection
    const result = await pool.query(patchDog, [
      dogId, // dogId should be the first parameter
      dogName,
      breed,
      age,
      colour,
      favouriteThing,
    ]);

    if (result.rowCount === 0) {
      return null; // No dog was found with the provided ID
    }

    return result.rows[0];
  } catch (error) {
    console.error(`Error updating dog object. Error: ${error.message}`);
    throw error;
  }
}

// export default async function patchDogById(dogId, dogData){
//   try {
//     const updates = [];
//     const values = [];
//     let index = 1;

//     for (const [key, value] of Object.entries(dogData)){
//       updates.push(`${key} = $${index}`);
//       values.push(value);
//       index++;
//     }
//     const updateString = updates.join(', ')
//     const patchDog = `UPDATE dogs
//     SET ${updateString}
//     WHERE id = $${index}
//     RETURNING *;`;

//     values.push(dogId);

//     const result = await pool.query(patchDog, values);

//     return result.rows[0];
//   }catch (error) {
//     console.error(
//       `Error updating dog object. Error originated in patchDogById.js. Error: ${error}`
//     );
//     throw error;
//   }
// }
