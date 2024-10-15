import { walks } from "../../helper-functions/helperFunctions.js";

export default async function getWalksByIdController(req, res) {
  try {
    // Extract the walk ID from request params
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Walk ID is required" });
    }

    const walksById = await walks.getWalksById(id);

    if (!walksById) {
      return res
        .status(404)
        .json({ status: "error", message: "No walk found with that ID" });
    }

    res.status(200).json({ status: "success", data: walksById });
  } catch (error) {
    console.error("Error in getWalksByIdController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error getting walk by ID" });
  }
}
