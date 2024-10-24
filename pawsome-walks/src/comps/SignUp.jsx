import { useState, useEffect, useContext } from "react";

export default function SignUp() {
  const [newOwner, setNewOwner] = useState({});
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


const handleEmailChange = (e) => setEmail(e.target.value);
const handleUsernameChange = (e) => setUsername(e.target.value);
const handlePasswordChange = (e) => setPassword(e.target.value);
const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (email === "" || username === "" || password === "") {
        alert("Please fill in all fields");
        return;
        }

        validEmail = emailIsValid(email);

    if (!validEmail) {
        alert("Please enter a valid email address");
        return;
    }
    setNewOwner({ email, username, password });

  return <></>;
}
