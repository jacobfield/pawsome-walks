import { uploadsWalks } from "../../helper-functions/helperFunctions.js";

export default async function getUploadsWalksByWalkIdController(req, res) {
  try {
    const id = req.params.walkId;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Walk ID is required" });
    }

    const uploadsWalksById = await uploadsWalks.getUploadsWalksByWalkId(id);
    if (!uploadsWalksById) {
      return res
        .status(404)
        .json({ status: "error", message: "No data found with that ID" });
    }
    res.status(200).json({ status: "success", data: uploadsWalksById });
  } catch (error) {
    console.error("Error in getUploadsWalksByWalkIdController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error getting walk by ID" });
  }
}
