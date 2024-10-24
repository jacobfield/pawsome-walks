import { useState, useEffect, useContext } from "react";
import postOwner from "../hooks/apiCalls/postOwner";
import hashPassword from "../hooks/hashPassword";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeProvider";

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
  const { darkTheme } = useContext(ThemeContext);

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

    const validEmail = emailIsValid(email);

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (!validEmail) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const hashedPassword = await hashPassword(password);
      setHashedPassword(hashedPassword);

      const ownerData = { email, username, password: hashedPassword };
      setNewOwner(ownerData);
      await postOwner(ownerData);

      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error hashing password or posting owner:", error);
    }
  };

  return (
    <div className="signupContainer">
      <Link className="noTextDecoration" to="/">
        <img
          className={`signuplogo ${darkTheme ? "dark" : "light"}`}
          alt="Pawsome Walks Logo"
          src="/logo.png"
        ></img>
      </Link>
      <form onSubmit={handleSubmit} className="signupForm">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
