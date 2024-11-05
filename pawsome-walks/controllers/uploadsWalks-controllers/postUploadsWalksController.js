import { uploadsWalks } from "../../helper-functions/helperFunctions.js";

export default async function postUploadsWalksController(req, res) {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Data is required" });
    }

    const newUploadWalksController = await uploadsWalks.postUploadsWalks(data);
    res.status(201).json({ status: "success", data: newUploadWalksController });
  } catch (error) {
    console.error("Error in postUploadWalksController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error posting walk", error });
  }
}
