import { pool } from "../../../index.js";

export default async function seedOwnersTable() {
  try {
    await pool.query(`
        
        INSERT INTO owners (userName, email, hashedPassword) 
        VALUES 
        ('Jacob', 'jacob@happywired.com', 'password123'), 
        ('Camille', 'camille.bullough@gmail.com', 'password123'), 
        ('Veronica', 'verongrant@yahoo.co.uk', 'password123') `);
    console.log(`owners table has been successfully seeded`);
  } catch (error) {
    console.error(
      "Error seeding owners table. Error originated in seedOwnersTable.js",
      error
    );
    console.error("Error Stack: ", error.stack);
  }
}
