import bcrypt from "bcryptjs";
import { owners } from "../../helper-functions/helperFunctions.js";

export default async function postOwnerController(req, res) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email, username, and password are required",
      });
    }

    // Hash the password on the server side
    const hashedpassword = await bcrypt.hash(password, 10);
    const newOwner = await owners.postOwner({
      username,
      email,
      hashedpassword,
    });

    res.status(201).json({ status: "success", data: newOwner });
  } catch (error) {
    console.error("Error in postOwnerController: ", error);
    res.status(500).json({ status: "error", message: "Error posting ownerz" });
  }
}
