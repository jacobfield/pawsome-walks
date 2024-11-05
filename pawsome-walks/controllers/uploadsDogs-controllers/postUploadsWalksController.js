import { uploadsDogs } from "../../helper-functions/helperFunctions.js";

export default async function postUploadsDogsController(req, res) {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Data is required" });
    }
    const newUploadWalk = await uploadsDogs.postUploadsDogs(data);

    res.status(201).json({ status: "success", data: newUploadWalk });
  } catch (error) {
    console.error("Error in postUploadsDogsController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error posting dog", error });
  }
}
