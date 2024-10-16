import { pool } from "../../../index.js";

export default async function seedOtherTables() {
  try {
    await pool.query(`
        
            INSERT INTO owners (userName, email, hashedPassword) 
            VALUES 
            ('Jacob', 'jacob@happywired.com', 'password123'), 
            ('Camille', 'camille.bullough@gmail.com', 'password123'), 
            ('Veronica', 'verongrant@yahoo.co.uk', 'password123') `);
    console.log(`owners table has been successfully seeded`);

    await pool.query(`
    
            INSERT INTO dogs (dogName, ownerId, breed, age, colour, favouriteThing) 
            VALUES 
            ('Eevee', 1, 'Springer Spaniel', 1, 'Black and White', 'Playing Fetch'), 
            ('Lupin', 2, 'Australian Shepherd', 7, 'Tri-Colour', 'Dinner Time'), 
            ('Jess', 3, 'Springer Spaniel', 3, 'Brown and White', 'Being Outside') `);

    console.log(`dogs table has been successfully seeded`);

    await pool.query(`
          INSERT INTO ownersDogs (ownerId, dogId)
          VALUES 
          (1, 1),
          (2, 2),
          (3, 3);`);

    console.log(`ownersDogs table has been successfully seeded`);

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

    await pool.query(`          
              INSERT INTO dogPals (dogId1, dogId2)
              VALUES
              (1, 2),
              (1, 3),
              (2, 3);`);

    console.log(`dogPals table has been successfully seeded`);

    await pool.query(`
            INSERT INTO dogPalRequests (senderDogId, receiverDogId)
            VALUES
            (1, 3),
            (3, 2);`);

    console.log(`dogPalRequests table has been successfully seeded`);

    await pool.query(`
              INSERT INTO walkComments (walkId, ownerId, comment)
              VALUES
              (13, 1, 'Great walk, Eevee loved it!'),
              (13, 2, 'Lupin had a great time, fantastic place!'),
              (30, 3, 'Jess had a great time!');`);

    console.log(`walkComments table has been successfully seeded`);
  } catch (error) {
    console.error(
      "Error seeding other tables. Error originated in seedOtherTables.js",
      error
    );
    console.error("Error Stack: ", error.stack);
  }
}
