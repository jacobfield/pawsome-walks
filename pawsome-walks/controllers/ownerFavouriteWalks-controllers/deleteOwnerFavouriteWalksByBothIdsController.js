import { ownerFavouriteWalks } from "../../helper-functions/helperFunctions.js";

export default async function deleteOwnerFavouriteWalksByBothIdsController(
  req,
  res
) {
  const data = req.body;
  const { ownerid, walkid } = data;

  try {
    if (!ownerid || !walkid) {
      return res.status(400).json({
        status: "error",
        message: "Owner ID and Walk ID are required ",
      });
    }
    const deleteOwnerFavouriteWalks =
      await ownerFavouriteWalks.deleteOwnerFavouriteWalksByBothIds(
        ownerid,
        walkid
      );
    if (deleteOwnerFavouriteWalks.length === 0) {
      // Check if any rows were deleted
      return res.status(404).json({
        status: "error",
        message:
          "No ownerFavouriteWalks found with the given Owner ID and Walk ID",
      });
    }
    res
      .status(200)
      .json({ status: "success", data: deleteOwnerFavouriteWalks });
  } catch (error) {
    console.error(
      "Error in deleteOwnerFavouriteWalksByOwnerIdController: ",
      error
    );
    res.status(500).json({
      status: "error",
      message: "Error deleting ownerFavouriteWalks by Owner ID and Walk ID",
    });
  }
}
