import { dogs } from "../../helper-functions/helperFunctions.js";

export default async function getDogByIdController(req, res) {
  try {
    const id = req.params.dogId;
    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Dog ID is required" });
    }
    const dogById = await dogs.getDogById(id);
    if (!dogById) {
      return res
        .status(404)
        .json({ status: "error", message: "No dog found with that ID" });
    }
    res.status(200).json({ status: "success", data: dogById });
  } catch (error) {
    console.error("Error in getDogByIdController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error getting dog by ID" });
  }
}
