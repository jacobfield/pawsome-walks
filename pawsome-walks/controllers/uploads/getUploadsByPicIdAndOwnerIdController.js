import { owners } from "../../helper-functions/helperFunctions.js";

export default async function getUploadsByPicIdAndOwnerIdController(req, res) {
  try {
    const picId = req.params.picId;
    const ownerId = req.params.ownerId;

    if (!picId || !ownerId) {
      return res.status(400).json({
        status: "error",
        message: "Both Pic ID and Owner ID are required",
      });
    }

    // Corrected argument order
    const uploads = await owners.getUploadsByPicIdAndOwnerId(ownerId, picId);

    if (!uploads || uploads.length === 0) {
      // Check for empty array
      return res.status(404).json({
        status: "error",
        message: "No uploads found with that Pic ID and Owner ID",
      });
    }

    res.status(200).json({ status: "success", data: uploads });
  } catch (error) {
    console.error("Error in getUploadsByPicIdAndOwnerIdController: ", error);
    res.status(500).json({
      status: "error",
      message: "Error getting uploads by Pic ID and Owner ID",
    });
  }
}
