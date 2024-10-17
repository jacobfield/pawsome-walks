import { ownersDogs } from "../../helper-functions/helperFunctions.js";

export default async function getOwnersDogsByOwnersIdController(req, res) {
  try {
    const id = req.params.ownersId;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Owner ID is required" });
    }

    const ownersDogsByOwnersId = await ownersDogs.getOwnersDogsByOwnersId(id);

    if (!ownersDogsByOwnersId) {
      return res.status(404).json({
        status: "error",
        message: "No dog found with that Owner ID",
      });
    }

    res.status(200).json({ status: "success", data: ownersDogsByOwnersId });
  } catch (error) {
    console.error("Error in getOwnersDogsByOwnersIdController: ", error);
    res.status(500).json({
      status: "error",
      message: "Error getting dog by Owner ID",
    });
  }
}
