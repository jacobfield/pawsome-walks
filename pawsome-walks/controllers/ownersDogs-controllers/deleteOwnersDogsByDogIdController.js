import { ownersDogs } from "../../helper-functions/helperFunctions.js";

export default async function deleteOwnersDogsByIdController(req, res) {
  try {
    const id = req.params.dogId;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Dog ID is required" });
    }

    const deletedOwnersDog = await ownersDogs.deleteOwnersDogsById(id);
    if (!deletedOwnersDog) {
      return res.status(404).json({
        status: "error",
        message: "No ownerDog found with that ID",
      });
    }
    res.status(200).json({ status: "success", data: deletedOwnersDog });
  } catch (error) {
    console.error("Error in deleteOwnersDogsByIdController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error deleting ownerDog by ID" });
  }
}
