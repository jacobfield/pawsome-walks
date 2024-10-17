import { dogs } from "../../helper-functions/helperFunctions.js";
export default async function patchDogByIdController(req, res) {
  try {
    const id = req.params.dogId;
    const data = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Dog ID is required" });
    }

    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Updated dog data is required" });
    }

    const updatedDog = await dogs.patchDogById(id, data);

    if (!updatedDog) {
      return res
        .status(404)
        .json({ status: "error", message: "No dog found with that ID" });
    }

    res.status(200).json({ status: "success", data: updatedDog });
  } catch (error) {
    console.error("Error in patchDogByIdController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error updating dog by ID" });
  }
}
