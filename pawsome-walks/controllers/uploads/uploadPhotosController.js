// controllers/uploads/uploadPhotosController.js
import dotenv from "dotenv";
import { uploadImageToBucket } from "../../src/helpers/supabaseBucketUploader.js";
import {
  insertUploadRecord,
  fetchUploadRecord,
} from "../../src/helpers/supabaseDbInserter.js";

dotenv.config();

export async function uploadPhotosController(req, res) {
  console.log("Controller invoked");

  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    if (!req.file) {
      console.log("No file uploaded");
      return res
        .status(400)
        .json({ status: "error", message: "No file uploaded" });
    }

    const filename = `${Date.now()}_${req.file.originalname}`.replace(
      /\s/g,
      ""
    );
    console.log("Generated filename:", filename);

    const uploadedFilename = await uploadImageToBucket(req.file, filename);
    console.log("Uploaded Filename:", uploadedFilename);

    const uploadData = {
      picname: uploadedFilename,
      ownerid: req.body.ownerid,
      walkid: req.body.walkid,
      dogid: req.body.dogid,
    };
    console.log("Upload Data:", uploadData);

    const insertedData = await insertUploadRecord(uploadData);
    console.log("Inserted Data:", insertedData);

    const fullRow = await fetchUploadRecord(insertedData[0].picid);
    console.log("Full Row:", fullRow);

    res.status(201).json({ status: "success", data: fullRow || insertedData });
  } catch (error) {
    console.error("Error in uploadPhotosController:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
