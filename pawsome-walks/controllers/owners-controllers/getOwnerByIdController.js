import { owners } from "../../helper-functions/helperFunctions.js";

export default async function getOwnerByIdController(req, res) {
  try {
    const id = req.params.ownerId;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Owner ID is required" });
    }

    const ownerById = await owners.getOwnerById(id);

    if (!ownerById) {
      return res
        .status(404)
        .json({ status: "error", message: "No owner found with that ID" });
    }

    res.status(200).json({ status: "success", data: ownerById });
  } catch (error) {
    console.error("Error in getOwnerByIdController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error getting owner by ID" });
  }
}
