// controllers/uploads/uploadPhotosController.js
import dotenv from "dotenv";
import { uploadImageToBucket } from "../../src/helpers/supabaseBucketUploader.js";
import { insertUploadRecord } from "../../src/helpers/supabaseDbInserter.js";

dotenv.config();

export async function uploadPhotosController(req, res) {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: "error", message: "No file uploaded" });
    }

    const filename = `${Date.now()}_${req.file.originalname}`.replace(
      /\s/g,
      ""
    );
    const uploadedFilename = await uploadImageToBucket(req.file, filename);

    const uploadData = {
      pic_name: uploadedFilename,
    };
    console.log("Upload Data:", uploadData);
    const insertedData = await insertUploadRecord(uploadData);
    // Log insertedData to confirm if it's successful
    console.log("Inserted Data:", insertedData);
    res
      .status(201)
      .json({ status: "success", data: { imageUrl, insertedData } });
  } catch (error) {
    console.error("Error in uploadPhotosController:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
