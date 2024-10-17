import { dogPals } from "../../helper-functions/helperFunctions.js";

export default async function postDogPalController(req, res) {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "dogPal data is required" });
    }
    const newDogPal = await dogPals.postDogPal(data);
    if (!newDogPal) {
      return res
        .status(400)
        .json({ status: "error", message: "Error posting dogPal" });
    }

    res.status(200).json({ status: "success", data: newDogPal });
  } catch (error) {
    console.error("Error in postDogPalController: ", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error posting dogPal",
    });
  }
}
