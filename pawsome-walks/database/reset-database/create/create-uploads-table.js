import { pool } from "../../../index.js";

// function to create uploads table
export default async function createUploadsTable() {
  try {
    console.log("Creating uploads table...");
    await pool.query(`
      CREATE SEQUENCE IF NOT EXISTS uploads_pic_id_seq START 40; 

      CREATE TABLE IF NOT EXISTS uploads (
        pic_id INT PRIMARY KEY DEFAULT nextval('uploads_pic_id_seq'),
        pic_name TEXT NOT NULL,
        profile_pic BOOLEAN DEFAULT FALSE,
        walk_pic BOOLEAN DEFAULT FALSE,
        dog_pic BOOLEAN DEFAULT FALSE,
        url TEXT,
        uploaded_at TIMESTAMP DEFAULT NOW(),
        ownerId INT,
        dogId INT,
        walkId INT,
        CONSTRAINT fk_ownerId FOREIGN KEY(ownerId) REFERENCES owners(ownerId) ON DELETE CASCADE,
        CONSTRAINT fk_dogId FOREIGN KEY(dogId) REFERENCES dogs(dogId) ON DELETE CASCADE,
        CONSTRAINT fk_walkId FOREIGN KEY(walkId) REFERENCES walks(walkId) ON DELETE CASCADE
      );
    `);
    console.log("uploads table created");
  } catch (error) {
    console.error(
      "uploads table not created. Error originated in create-uploads-table.js",
      error
    );
  }
}
