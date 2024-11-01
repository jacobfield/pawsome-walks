// controllers/uploads/uploadPhotosController.js
import dotenv from "dotenv";
import { uploadImageToBucket } from "../../src/helpers/supabaseBucketUploader.js";
import { insertUploadRecord } from "../../src/helpers/supabaseDbInserter.js";

dotenv.config();

export async function uploadPhotosController(req, res) {
  try {
    console.log("Controller begins");

    if (!req.file) {
      return res
        .status(400)
        .json({ status: "error", message: "No file uploaded" });
    }

    const filename = `${Date.now()}_${req.file.originalname}`.replace(
      /\s/g,
      ""
    );
    console.info("Filename:", filename);

    // Upload image to bucket
    const uploadedFilename = await uploadImageToBucket(req.file, filename);

    // Fetch the public URL directly after upload
    const { data: urlData, error: urlError } = supabase.storage
      .from("uploads")
      .getPublicUrl(uploadedFilename);
    if (urlError) throw urlError;

    const imageUrl = urlData.publicURL;
    console.info("Public URL:", imageUrl);

    // Prepare and insert row into database
    const profile_pic = req.body.profile_pic === "true";
    const walk_pic = req.body.walk_pic === "true";
    const dog_pic = req.body.dog_pic === "true";

    const uploadData = {
      pic_name: uploadedFilename,
      url: imageUrl,
      profile_pic,
      walk_pic,
      dog_pic,
    };

    const insertedData = await insertUploadRecord(uploadData);

    res
      .status(201)
      .json({ status: "success", data: { imageUrl, insertedData } });
  } catch (error) {
    console.error("Error in uploadPhotosController:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
