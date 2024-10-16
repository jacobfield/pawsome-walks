import { pool } from "../../../index.js";

export default async function seedWalkCommentsTable() {
  try {
    await pool.query(`
        INSERT INTO walkComments (walkId, ownerId, comment)
        VALUES
        (1, 1, 'Great walk, Eevee loved it!'),
        (1, 3, 'What a nice, tranquil place.'),
        (13, 2, 'Lupin had a great time, fantastic place!'),
        (30, 3, 'Jess had a great time!');`);

    console.log(`walkComments table has been successfully seeded`);
  } catch (error) {
    console.error(
      "Error seeding walkComments table. Error originated in seedWalkCommentsTable.js",
      error
    );
    console.error("Error Stack: ", error.stack);
  }
}
