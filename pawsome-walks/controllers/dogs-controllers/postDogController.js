import { dogs } from "../../helper-functions/helperFunctions.js";

export default async function postDogController(req, res) {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Dog data is required" });
    }

    const newDog = await dogs.postDog(data);
    res.status(201).json({ status: "success", data: newDog });
  } catch (error) {
    console.error("Error in postDogController: ", error);
    res.status(500).json({ status: "error", message: "Error posting dog" });
  }
}
