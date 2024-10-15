import { dogPalRequests } from "../../helper-functions/helperFunctions.js";

export default async function postDogPalRequestController(req, res) {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "dogPal data is required" });
    }
    const newDogPalRequest = await dogPalRequests.postDogPalRequest(data);

    res.status(201).json({ status: "success", data: newDogPalRequest });
  } catch (error) {
    console.error("Error in postDogPalRequestController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error posting dogPalRequest" });
  }
}
