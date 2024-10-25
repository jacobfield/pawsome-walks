const bcrypt = require("bcryptjs");
const db = require("./yourDatabase"); // Replace with your actual database module

// Function to validate user login
async function validateUserLogin(usernameOrEmail, inputPassword) {
  try {
    // Fetch user from the database
    const user = await db.getUserByUsernameOrEmail(usernameOrEmail); // Replace with your actual function

    // If user does not exist, return an error
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Compare the input password with the stored hashed password
    const isMatch = await bcrypt.compare(inputPassword, user.hashedPassword); // Adjust based on your schema

    if (isMatch) {
      // Passwords match
      return { success: true, message: "Login successful", user }; // Add any other necessary user info
    } else {
      // Passwords do not match
      return { success: false, message: "Invalid password" };
    }
  } catch (error) {
    console.error("Error validating user login:", error);
    return { success: false, message: "Internal server error" };
  }
}
