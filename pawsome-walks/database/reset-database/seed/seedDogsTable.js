import { pool } from "../../../index.js";

export default async function seedDogsTable() {
  try {
    await pool.query(`
    
        INSERT INTO dogs (dogName, ownerId, breed, age, colour, favouriteThing) 
        VALUES 
        ('Eevee', 1, 'Springer Spaniel', 1, 'Black and White', 'Playing Fetch'), 
        ('Lupin', 2, 'Australian Shepherd', 7, 'Tri-Colour', 'Dinner Time'), 
        ('Jess', 3, 'Springer Spaniel', 3, 'Brown and White', 'Being Outside') `);

    console.log(`dogs table has been successfully seeded`);
  } catch (error) {
    console.error(
      "Error seeding dogs table. Error originated in seedDogsTable.js",
      error
    );
    console.error("Error Stack: ", error.stack);
  }
}
