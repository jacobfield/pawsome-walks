import { owners } from "../../helper-functions/helperFunctions.js";

export default async function getUploadsByPicIdAndWalkIdController(req, res) {
  try {
    const picId = req.params.picId;
    const walkId = req.params.walkId;

    if (!picId || !walkId) {
      return res.status(400).json({
        status: "error",
        message: "Both Pic ID and Walk ID are required",
      });
    }

    const uploads = await owners.getUploadsByPicIdAndWalkId(picId, walkId);

    if (!uploads || uploads.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No uploads found with that Pic ID and Walk ID",
      });
    }

    res.status(200).json({ status: "success", data: uploads });
  } catch (error) {
    console.error("Error in getUploadsByPicIdAndWalkIdController: ", error);
    res.status(500).json({
      status: "error",
      message: "Error getting uploads by Pic ID and Walk ID",
    });
  }
}
