import { ownerFavouriteWalks } from "../../helper-functions/helperFunctions.js";

export default async function getOwnerFavouriteWalksByOwnerIdController(
  req,
  res
) {
  try {
    const id = req.params.ownersId;
    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "Owner ID is required" });
    }
    const ownerFavouriteWalksByOwnerId =
      await ownerFavouriteWalks.getOwnerFavouriteWalksByOwnerId(id);

    if (!ownerFavouriteWalksByOwnerId) {
      return res.status(404).json({
        status: "error",
        message: "No favourite walks found with that Owner ID",
      });
    }

    res
      .status(200)
      .json({ status: "success", data: ownerFavouriteWalksByOwnerId });
  } catch (error) {
    console.error(
      "Error in getOwnerFavouriteWalksByOwnerIdController: ",
      error
    );
    res.status(500).json({
      status: "error",
      message: "Error getting favourite walks by Owner ID",
    });
  }
}
