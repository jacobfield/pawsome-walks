import { walks } from "../../helper-functions/helperFunctions.js";

export default async function postWalkController(req, res) {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Walk data is required" });
    }

    const newWalk = await walks.postWalk(data);

    res.status(201).json({ status: "success", data: newWalk });
  } catch (error) {
    console.error("Error in postWalkController: ", error);
    res.status(500).json({ status: "error", message: "Error posting walk" });
  }
}
