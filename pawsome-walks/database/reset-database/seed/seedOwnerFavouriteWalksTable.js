import { pool } from "../../../index.js";

export default async function seedOwnerFavouriteWalksTable() {
  try {
    await pool.query(`
    INSERT INTO ownerFavouriteWalks (ownerId, walkId)
    VALUES
  (1, 13),
  (1, 17),
  (2, 13),
  (2, 14),
  (3, 25),
  (3, 30);
    `);

    console.log(`ownerFavouriteWalks table has been successfully seeded`);
  } catch (error) {
    console.error(
      "Error seeding ownerFavouriteWalksTable table. Error originated in seedOwnerFavouriteWalksTable.js",
      error
    );
    console.error("Error Stack: ", error.stack);
  }
}
