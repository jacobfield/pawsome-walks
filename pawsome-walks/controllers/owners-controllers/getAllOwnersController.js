import { owners } from "../../helper-functions/helperFunctions.js";

export default async function getAllallOwnersController(req, res) {
  try {
    const allOwners = await owners.getAllallOwners();

    if (!allOwners) {
      return res
        .status(404)
        .json({ status: "error", message: "No allOwners found" });
    }
    res.status(200).json({ status: "success", data: allOwners });
  } catch (error) {
    console.error("Error in getAllallOwnersController.js: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error getting allOwners" });
  }
}
