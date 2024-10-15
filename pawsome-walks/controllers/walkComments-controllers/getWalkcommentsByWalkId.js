import { walkComments } from "../../helper-functions/helperFunctions.js";

export default async function getWalkCommentsByWalkIdController(req, res) {
  try {
    const walkId = req.params.id;
    if (!walkId) {
      return res
        .status(400)
        .json({ status: "error", message: "Walk ID is required" });
    }
    const walkCommentsByWalkId = await walkComments.getWalkCommentsByWalkId(
      walkId
    );
    if (!walkCommentsByWalkId) {
      return res.status(404).json({
        status: "error",
        message: "No walk comments found with that Walk ID",
      });
    }

    res.status(200).json({ status: "success", data: walkCommentsByWalkId });
  } catch (error) {
    console.error("Error in getWalkCommentsByWalkIdController: ", error);
    res.status(500).json({
      status: "error",
      message: "Error getting walk comments by Walk ID",
    });
  }
}
