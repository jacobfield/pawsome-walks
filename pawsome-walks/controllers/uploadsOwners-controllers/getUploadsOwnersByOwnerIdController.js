import { uploadsOwners } from "../../helper-functions/helperFunctions.js";

export default async function getUploadsOwnersByOwnerIdController(req, res) {
  try {
    const id = req.params.ownerId;
    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Owner ID is required" });
    }
    const uploadsOwnersByOwnerId =
      await uploadsOwners.getUploadsOwnersByOwnerId(id);

    if (!uploadsOwnersByOwnerId) {
      return res
        .status(404)
        .json({ status: "error", message: "No Owner pics found with that ID" });
    }

    res.status(200).json({ status: "success", data: uploadsOwnersByOwnerId });
  } catch (error) {
    console.error("Error in getUploadsOwnersByOwnerIdController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error getting owner pics by ID" });
  }
}
