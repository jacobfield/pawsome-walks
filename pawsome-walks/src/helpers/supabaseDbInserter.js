// src/helpers/supabaseDbInserter.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SECRET_KEY
);

/**
 * Inserts a row into the Supabase uploads table
 * @param {Object} uploadData - Data object with fields to insert
 * @returns {Object} - Inserted row data or error
 */
export async function insertUploadRecord(uploadData) {
  uploadData.url =
    `https://gwinwlodpvympyoitnza.supabase.co/storage/v1/object/public/uploads/${uploadData.picname}`.replace(
      /\s/g,
      ""
    );

  try {
    const { data, error } = await supabase
      .from("uploads")
      .insert([uploadData])
      .select("picid, url"); // Select the 'picid' and 'url' fields explicitly

    if (error) throw error;

    return data[0]; // Return the first object containing 'picid' and 'url'
  } catch (error) {
    console.error("Error inserting row into database:", error);
    throw error;
  }
}
