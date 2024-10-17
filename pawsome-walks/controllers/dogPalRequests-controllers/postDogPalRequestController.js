import { dogPalRequests } from "../../helper-functions/helperFunctions.js";
export default async function postDogPalRequestController(req, res) {
  try {
    // Use lowercase parameter names to match the request body
    const { senderdogid, receiverdogid } = req.body;

    // Check if both IDs are provided
    if (!senderdogid || !receiverdogid) {
      return res.status(400).json({
        status: "error",
        message: "Sender and Receiver dog IDs are required",
      });
    }

    // Call the helper function, mapping to camelCase
    const newDogPalRequest = await dogPalRequests.postDogPalRequest({
      senderDogId: senderdogid,
      receiverDogId: receiverdogid,
    });

    res.status(201).json({ status: "success", data: newDogPalRequest });
  } catch (error) {
    console.error("Error in postDogPalRequestController: ", error);

    res.status(500).json({
      status: "error",
      message: "Error posting dogPalRequest",
      error: error.message, // Ensure error message is passed to the response
    });
  }
}
