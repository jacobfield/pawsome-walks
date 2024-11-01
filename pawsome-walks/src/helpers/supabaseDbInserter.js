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
  try {
    const { data, error } = await supabase.from("uploads").insert([uploadData]);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error inserting row into database:", error);
    throw error;
  }
}
