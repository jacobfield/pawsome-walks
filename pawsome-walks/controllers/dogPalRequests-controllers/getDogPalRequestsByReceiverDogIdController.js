import { dogPalRequests } from "../../helper-functions/helperFunctions.js";

export default async function getDogPalRequestsByReceiverDogIdController(
  req,
  res
) {
  try {
    const id = req.params.receiverDogId;
    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Receiver Dog ID is required" });
    }
    const dogPalRequestsByReceiver =
      await dogPalRequests.getDogPalRequestsByReceiverDogId(id);
    if (!dogPalRequestsByReceiver) {
      return res.status(404).json({
        status: "error",
        message: "No dog pal requests found with that ID",
      });
    }
    res.status(200).json({ status: "success", data: dogPalRequestsByReceiver });
  } catch (error) {
    console.error(
      "Error in getDogPalRequestsByReceiverDogIdController: ",
      error
    );
    res.status(500).json({
      status: "error",
      message: "Error getting dog pal requests by receiver dog ID",
    });
  }
}
