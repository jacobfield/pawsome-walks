import { uploadsDogs } from "../../helper-functions/helperFunctions.js";

export default async function getUploadsDogsByDogIdController(req, res) {
  try {
    const id = req.params.dogId;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Dog ID is required" });
    }

    const uploadsDogsById = await uploadsDogs.getUploadsDogsByDogId(id);

    if (!uploadsDogsById) {
      return res
        .status(404)
        .json({ status: "error", message: "No data found with that ID" });
    }
    res.status(200).json({ status: "success", data: uploadsDogsById });
  } catch (error) {
    console.error("Error in getUploadsDogsByDogIdController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error getting dog by ID" });
  }
}
