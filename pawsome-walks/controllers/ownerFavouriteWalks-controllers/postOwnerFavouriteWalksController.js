import { ownerFavouriteWalks } from "../../helper-functions/helperFunctions.js";

export default async function postOwnerFavouriteWalksController(req, res) {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "OwnerFavouriteWalks data is required",
        });
    }
    const newOwnerFavouriteWalk =
      await ownerFavouriteWalks.postOwnerFavouriteWalks(data);
    res.status(201).json({ status: "success", data: newOwnerFavouriteWalk });
  } catch (error) {
    console.error("Error in postOwnerFavouriteWalksController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error posting ownerFavouriteWalk" });
  }
}
