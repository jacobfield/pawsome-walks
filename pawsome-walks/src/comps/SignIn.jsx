import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const { login } = useAuth();
  //
  useEffect(() => {
    async function fetchAllOwnersData() {
      const allOwnersData = await getAllOwners();
      setAllOwners(allOwnersData);
    }
    fetchAllOwnersData();
  }, []);
  // console.log(allOwners);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
      console.log("owner", owner);
      if (owner && (await bcrypt.compare(password, owner.hashedpassword))) {
        login({
          ownerId: owner.id,
          username: owner.username,
          email: owner.email,
        });
        console.log(owner.username, "logged in!");
        alert("Successfully logged in!");
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

// once data is inputted, the user can click the "Sign Up" button to submit the form.
// the form does a get request to check if email and password exist on a row in it
// need to create some context that holds the logged in owner
// if the email and password exist in the database, the user is logged in. logged in and owner is set to the owner context.
