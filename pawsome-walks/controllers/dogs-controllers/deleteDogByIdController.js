import { dogs } from "../../helper-functions/helperFunctions.js";

export default async function deleteDogByIdController(req, res) {
  try {
    const id = req.params.dogId;
    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Dog ID is required" });
    }

    const deletedDog = await dogs.deleteDogById(id);
    if (!deletedDog) {
      return res.status(404).json({
        status: "error",
        message: "No dog found with that ID",
      });
    }

    res.status(200).json({ status: "success", data: deletedDog });
  } catch (error) {
    console.error("Error in deleteDogByIdController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error deleting dog by ID" });
  }
}
