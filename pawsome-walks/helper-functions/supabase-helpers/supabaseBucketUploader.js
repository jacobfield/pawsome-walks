
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SECRET_KEY
);

/**
 * Uploads an image to the Supabase storage bucket
 * @param {Object} file - The file object from multer (req.file)
 * @param {String} filename - The desired filename in the bucket
 * @returns {String} - The filename if upload is successful
 */
export async function uploadImageToBucket(file, filename) {
  try {
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(filename, file.buffer, { contentType: file.mimetype });


    if (error) throw error;
    return filename;
  } catch (error) {
    console.error("Error uploading image to bucket:", error);
    throw error;
  }
}
