import { owners } from "../../helper-functions/helperFunctions.js";

export default async function getAllOwnersController(req, res) {
  try {
    const owners = await owners.getAllOwners();

    if (!owners) {
      return res
        .status(404)
        .json({ status: "error", message: "No owners found" });
    }
    res.status(200).json({ status: "success", data: owners });
  } catch (error) {
    console.error("Error in getAllOwnersController.js: ", error);
    res.status(500).json({ status: "error", message: "Error getting owners" });
  }
}
