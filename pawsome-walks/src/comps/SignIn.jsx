import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "./ThemeProvider";
import bcrypt from "bcryptjs";
import { AuthContext, useAuth } from "./AuthContext";
import getAllOwners from "../hooks/apiCalls/getAllOwners";

//
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allOwners, setAllOwners] = useState();
  const { darkTheme } = useContext(ThemeContext);
  const { login, logout, owner } = useAuth(); // Access `owner` from context
  const navigate = useNavigate();
  // Log the logged-in user's username on mount or whenever `owner` changes
  useEffect(() => {
    if (owner && owner.username) {
      console.log(`Logged in user: ${owner.username}`);
    } else {
      console.log("No user is logged in currently.");
    }
  }, [owner]); // Runs on mount and whenever `owner` changes

  useEffect(() => {
    async function fetchAllOwnersData() {
      const allOwnersData = await getAllOwners();
      setAllOwners(allOwnersData);
    }
    fetchAllOwnersData();
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogOut = () => {
    logout();
    console.log("Logged out");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
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
      const owner = allOwners.find((owner) => owner.email === email);
      // console.log("owner", owner);
      if (owner && (await bcrypt.compare(password, owner.hashedpassword))) {
        login({
          ownerId: owner.id,
          username: owner.username,
          email: owner.email,
        });
        console.log(owner.username, "logged in! - SignIn.jsx");
        // alert("Successfully logged in!");
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error signing in:", error);
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
      <h1>Sign in:</h1>
      <form onSubmit={handleSubmit} className="signupForm">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Sign In</button>
      </form>
      <Link className="noTextDecoration" to="/SignUp">
        <p>First Time? {<br />} Create an account:</p>
      </Link>
    </div>
  );
}
