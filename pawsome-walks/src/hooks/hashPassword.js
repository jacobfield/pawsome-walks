import bcrypt from "bcryptjs";

export default async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error(`Error hashing password: ${error}`);
    throw error;
  }
}
