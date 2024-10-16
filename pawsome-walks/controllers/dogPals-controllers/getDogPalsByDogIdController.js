import { dogPals } from "../../helper-functions/helperFunctions.js";

export default async function getDogPalsByDogIdController(req, res) {
  try {
    const id = req.params.dogId;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Dog ID is required" });
    }
    const dogPalsByDogId = await dogPals.getDogPalsByDogId(id);
    if (!dogPalsByDogId) {
      return res
        .status(404)
        .json({ status: "error", message: "No dog found with that Dog ID" });
    }
    res.status(200).json({ status: "success", data: dogPalsByDogId });
  } catch (error) {
    console.error("Error in getDogPalsByDogIdController: ", error);
  }
}
