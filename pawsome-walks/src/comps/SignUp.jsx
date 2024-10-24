import { useState, useEffect, useContext } from "react";
import postOwner from "../hooks/apiCalls/postOwner";
import hashPassword from "../hooks/hashPassword";
export default function SignUp() {
  const [newOwner, setNewOwner] = useState({});
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (email === "" || username === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    const validEmail = emailIsValid(email); // Declare variable with `const`

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (!validEmail) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const hashedPassword = await hashPassword(password); // Wait for the hashed password
      setHashedPassword(hashedPassword);

      // Update newOwner with the hashed password
      const ownerData = { email, username, password: hashedPassword };
      setNewOwner(ownerData); // Set newOwner with the hashed password

      // Call postOwner with the newOwner data
      await postOwner(ownerData); // Assuming postOwner is also async

      // You may want to clear the form or handle post submission here
    } catch (error) {
      console.error("Error hashing password or posting owner:", error);
    }
  };

  return <></>;
}
