import { walkComments } from "../../helper-functions/helperFunctions.js";

export default async function deleteWalkCommentByIdController(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Walk Comment ID is required" });
    }
    const deletedWalkComment = await walkComments.deleteWalkCommentById(id);

    if (!deletedWalkComment) {
      return res.status(404).json({
        status: "error",
        message: "No walk comment found with that ID",
      });
    }

    res.status(200).json({ status: "success", data: deletedWalkComment });
  } catch (error) {
    console.error("Error in deleteWalkCommentByIdController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error deleting walk comment by ID" });
  }
}
