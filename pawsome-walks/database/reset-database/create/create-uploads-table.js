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
               url TEXT,
        uploaded_at TIMESTAMP DEFAULT NOW()
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
