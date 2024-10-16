import { dogPals } from "../../helper-functions/helperFunctions.js";

export default async function deleteDogPalsByBothIdsController(req, res) {
  try {
    const id1 = req.params.dogId1;
    const id2 = req.params.dogId2;

    if (!id1 || !id2) {
      return res
        .status(400)
        .json({ status: "error", message: "Both Dog IDs are required" });
    }
    const deletedDogPal = await dogPals.deleteDogPalsByBothIds(id1, id2);

    if (!deletedDogPal) {
      return res.status(404).json({
        status: "error",
        message: "No dogPal friendship found with those IDs",
      });
    }

    res.status(200).json({ status: "success", data: deletedDogPal });
  } catch (error) {
    console.error("Error in deleteDogPalsByBothIdsController: ", error);
    res.status(500).json({
      status: "error",
      message: "Error deleting dogPal friendship by both IDs",
    });
  }
}
