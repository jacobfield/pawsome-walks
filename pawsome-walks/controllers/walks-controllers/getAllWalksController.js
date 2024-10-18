import { walks } from "../../helper-functions/helperFunctions.js";

export default async function getAllWalksController(req, res) {
  try {
    const allWalks = await walks.getAllWalks();
    res.status(200).json({ status: "success", data: allWalks });
  } catch (error) {
    console.error("Error in getAllWalksController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error getting all walks" });
  }
}
