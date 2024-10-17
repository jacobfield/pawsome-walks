import { owners } from "../../helper-functions/helperFunctions.js";

export default async function updateOwnerPasswordController(req, res) {
  try {
    const id = req.params.ownerId;
    const { hashedPassword } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Owner ID is required" });
    }

    if (!hashedPassword || hashedPassword.trim() === "") {
      return res
        .status(400)
        .json({ status: "error", message: "New Password required" });
    }
    if (hashedPassword.length < 6) {
      return res.status(400).json({
        status: "error",
        message: "Password must be at least 6 characters long.",
      });
    }
    const updatedOwner = await owners.updateOwnerPassword({
      ownerId: id,
      hashedPassword: hashedPassword,
    });

    if (!updatedOwner) {
      return res.status(404).json({
        status: "error",
        message: "No owner found with that ID or update failed",
      });
    }
    res.status(200).json({ status: "success", data: updatedOwner });
  } catch (error) {
    console.error("Error in updateOwnerPasswordController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error updating owner password" });
  }
}
