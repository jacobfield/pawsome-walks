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
  const { picname, url, ownerid, walkid, dogid } = uploadData;
  uploadData.url =
    `https://gwinwlodpvympyoitnza.supabase.co/storage/v1/object/public/uploads/${picname}`.replace(
      /\s/g,
      ""
    );

  try {
    const { data, error } = await supabase.from("uploads").insert([uploadData]);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error inserting row into database:", error);
    throw error;
  }
}

// git commit -m "Made progress on uploading both the image and the walk row. Next need to sort out why there is a not null constraint on public.uploads.ownerid. 2 options - either remove the not null constraint (ideal) or insert the ownerid along with it, as only a logged in user can make add a walk anyway. -however, this may insert a new row in the uploadsOwner junction table, which would remove the profile picture. - option 3: Set a proxy ownerId in for these, such as 0, but this might sacrifice database integrity"
