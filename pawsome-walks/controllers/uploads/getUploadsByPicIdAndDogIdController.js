import { owners } from "../../helper-functions/helperFunctions.js";

export default async function getUploadsByPicIdAndDogIdController(req, res) {
  try {
    const picId = req.params.picId;
    const dogId = req.params.dogId;

    if (!picId || !dogId) {
      return res.status(400).json({
        status: "error",
        message: "Both Pic ID and Dog ID are required",
      });
    }

    const uploads = await owners.getUploadsByPicIdAndDogId(dogId, picId);

    if (!uploads || uploads.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No uploads found with that Pic ID and Dog ID",
      });
    }

    res.status(200).json({ status: "success", data: uploads });
  } catch (error) {
    console.error("Error in getUploadsByPicIdAndDogIdController: ", error);
    res.status(500).json({
      status: "error",
      message: "Error getting uploads by Pic ID and Dog ID",
    });
  }
}
