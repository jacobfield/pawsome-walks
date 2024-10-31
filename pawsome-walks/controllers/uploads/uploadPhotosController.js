import {
  uploadImage,
  getSignedUrl,
} from "../../helpers/supabaseStorageHelper.js";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SECRET_KEY
);

export async function uploadPhotosController(req, res) {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: "error", message: "No file uploaded" });
    }

    const filename = `${Date.now()}_${req.file.originalname}`;
    const imageUrl = await uploadImage(req.file, filename);

    // Parse booleans from req.body, defaulting to false
    const profile_pic = req.body.profile_pic === "true";
    const walk_pic = req.body.walk_pic === "true";
    const dog_pic = req.body.dog_pic === "true";

    const { data, error } = await supabase.from("uploads").insert([
      {
        pic_name: filename,
        url: imageUrl,
        profile_pic,
        walk_pic,
        dog_pic,
      },
    ]);

    if (error) throw error;

    res.status(201).json({ status: "success", data: { imageUrl } });
  } catch (error) {
    console.error("Error in uploadPhotosController: ", error);
    res.status(500).json({ status: "error", message: "Error uploading photo" });
  }
}
