import { owners } from "../../helper-functions/helperFunctions.js";

export default async function postOwnerController(req, res) {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Owner data is required" });
    }

    const newOwner = await owners.postOwner(data);
    res.status(201).json({ status: "success", data: newOwner });
  } catch (error) {
    console.error("Error in postOwnerController: ", error);
    res.status(500).json({ status: "error", message: "Error posting owner" });
  }
}
