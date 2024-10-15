import { walkComments } from "../../helper-functions/helperFunctions.js";

export default async function postWalkCommentsController(req, res) {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Walk Comment data is required" });
    }
    const newWalkComment = await walkComments.postWalkComments(data);

    res.status(201).json({ status: "success", data: newWalkComment });
  } catch (error) {
    console.error("Error in postWalkCommentsController: ", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error posting walk comment",
    });
  }
}
