import { dogPalRequests } from "../../helper-functions/helperFunctions.js";

export default async function updateDogPalRequestController(req, res) {
  try {
    const id = req.params.dogPalRequestId;
    const data = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Pal Request ID is required" });
    }

    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "dogPal Request data is required" });
    }

    const updatedDogPalRequest = await dogPalRequests.updateDogPalRequest(
      id,
      data.status
    );

    res.status(200).json({ status: "success", data: updatedDogPalRequest });
  } catch (error) {
    console.error("Error in updateDogPalRequestController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error updating dogPalRequest" });
  }
}
