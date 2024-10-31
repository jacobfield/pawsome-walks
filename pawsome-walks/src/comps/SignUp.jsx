import { useState, useContext } from "react";
import postOwner from "../hooks/apiCalls/postOwner";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeProvider";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { darkTheme } = useContext(ThemeContext);

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

    const validEmail = emailIsValid(email);
    if (!validEmail) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      const ownerData = { username, email, password };
      await postOwner(ownerData);

      // Reset form fields after successful signup
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      // Check for specific error code for unique constraint violations
      if (error.code === 409) {
        // Checking the code you set in postOwner
        alert(
          "Email address or username already exists. Please choose another."
        );
      } else {
        console.error("Error posting owner:", error);
        alert(
          "An error occurred while creating your account. Please try again."
        );
      }
    }
  };

  return (
    <div className={`signupContainer ${darkTheme ? "dark" : "light"}`}>
      <Link className="noTextDecoration" to="/">
        <img
          className={`signuplogo ${darkTheme ? "dark" : "light"}`}
          alt="Pawsome Walks Logo"
          src="/logo.png"
        />
      </Link>
      <h1 style={{ padding: "0px" }}>Create Account:</h1>
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
      </form>{" "}
      <Link className="noTextDecoration" to="/SignIn">
        <p>Been here before? {<br />} Sign in:</p>
      </Link>
    </div>
  );
}
