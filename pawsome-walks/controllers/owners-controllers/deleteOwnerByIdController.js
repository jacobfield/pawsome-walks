import { owners } from "../../helper-functions/helperFunctions.js";

export default async function deleteOwnerByIdController(req, res) {
  try {
    const id = req.params.ownerId;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Owner ID is required" });
    }
    const deletedOwner = await owners.deleteOwnerById(id);

    if (!deletedOwner) {
      return res.status(404).json({
        status: "error",
        message: "No owner found with that ID",
      });
    }
    res.status(200).json({ status: "success", data: deletedOwner });
  } catch (error) {
    console.error("Error in deleteOwnerByIdController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error deleting owner by ID" });
  }
}
