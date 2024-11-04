import { uploadsOwners } from "../../helper-functions/helperFunctions.js";

export default async function postUploadsOwnersController(req, res) {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Data is required" });
    }

    const newUploadOwner = await uploadsOwners.postUploadsOwners(data);

    res.status(201).json({ status: "success", data: newUploadOwner });
  } catch (error) {
    console.error("Error in postUploadsOwnersController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error posting owner", error });
  }
}
