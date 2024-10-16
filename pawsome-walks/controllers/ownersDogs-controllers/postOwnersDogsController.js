import { ownersDogs } from "../../helper-functions/helperFunctions.js";

export default async function postOwnersDogsController(req, res) {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "OwnerDogs data is required" });
    }
    const newOwnerDog = await ownersDogs.postOwnersDogs(data);
    res.status(201).json({ status: "success", data: newOwnerDog });
  } catch (error) {
    console.error("Error in postOwnersDogsController: ", error);
    res
      .status(500)
      .json({ status: "error", message: "Error posting ownerDog" });
  }
}
