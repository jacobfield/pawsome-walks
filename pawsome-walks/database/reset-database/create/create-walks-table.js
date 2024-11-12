import { pool } from "../../../index.js";

// function to create the walks table
export default async function createWalksTable() {
  try {
    // create the parking_type enum, for limited selection of parking type
    console.log("Creating parking_type ENUM...");
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'parking_type') THEN 
        CREATE TYPE parking_type AS ENUM ('free', 'paid', 'none');
        END IF;
        END $$`);

    console.log("Creating walks table...");
    await pool.query(`
        CREATE TABLE IF NOT EXISTS walks(
        walkId SERIAL PRIMARY KEY,
        walkName TEXT NOT NULL,
        photoPath TEXT NOT NULL,
        location TEXT NOT NULL,
        lat DECIMAL(9, 6) NOT NULL,
        lng DECIMAL(9, 6) NOT NULL,
        walkType TEXT[] NOT NULL,
        offLeadAreas BOOLEAN NOT NULL DEFAULT FALSE,
        paths BOOLEAN NOT NULL DEFAULT FALSE,
        animalsOnRoute BOOLEAN NOT NULL DEFAULT FALSE,
        toilets BOOLEAN NOT NULL DEFAULT FALSE,
        waterOnRoute BOOLEAN NOT NULL DEFAULT FALSE,
        scenic BOOLEAN NOT NULL DEFAULT FALSE,
        parking parking_type,
        approved BOOLEAN NOT NULL DEFAULT FALSE,
        )
        `);
    console.log("walks table created");
    // create the set_photo_path function, which sets the photoPath column to 'walk' + walkId
    console.log("Creating set_photo_path function...");
    await pool.query(`CREATE OR REPLACE FUNCTION set_photo_path()
RETURNS TRIGGER AS $$
BEGIN
  NEW.photoPath := 'walk' || NEW.walkId;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`);
    console.log("Created set_photo_path function");
    // Check if the trigger exists and drop it if it does
    console.log("Checking for existing set_photo_path_trigger...");
    await pool.query(`
       DROP TRIGGER IF EXISTS set_photo_path_trigger ON walks;
     `);
    // create the set_photo_path_trigger, which calls the set_photo_path function on row insert
    console.log("creating set_photo_path_trigger...");
    await pool.query(`CREATE TRIGGER set_photo_path_trigger
BEFORE INSERT ON walks
FOR EACH ROW
EXECUTE FUNCTION set_photo_path();
`);
    console.log("Created set_photo_path_trigger trigger");
  } catch (error) {
    console.error(
      "walks table not created. Error originated in create-walks-table.js",
      error
    );
  }
}
