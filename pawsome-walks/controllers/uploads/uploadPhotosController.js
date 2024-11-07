// controllers/uploads/uploadPhotosController.js
import dotenv from "dotenv";
import { uploadImageToBucket } from "../../helper-functions/supabase-helpers/supabaseBucketUploader.js";
import { insertUploadRecord } from "../../helper-functions/supabase-helpers/supabaseDbInserter.js";

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
      picname: uploadedFilename,
      ownerid: req.body.ownerid,
      walkid: req.body.walkid,
      dogid: req.body.dogid,
    };
    // console.log("Upload Data:", uploadData);
    const insertedData = await insertUploadRecord(uploadData);
    // Log insertedData to confirm if it's successful

    res.status(201).json({
      status: "success",
      data: insertedData,
    });
    console.log("Inserted Data:", insertedData);
  } catch (error) {
    console.error("Error in uploadPhotosController:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
