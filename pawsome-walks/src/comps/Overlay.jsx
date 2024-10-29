/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "./AuthContext";
import { ThemeContext } from "./ThemeProvider";
//
export default function Overlay({ navBarProps }) {
  const { logout, owner, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const { isOpen, setIsOpen, profilePicture, setProfilePicture } = navBarProps;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onLoad = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`overlay ${isOpen ? "open" : ""} ${
        darkTheme ? "dark" : "light"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`toggleOverlayButton ${darkTheme ? "dark" : "light"}`}
      >
        {isOpen ? "Close" : "Open"} Menu
      </button>
      <div className="overlayContent">
        <div className="profileSection">
          {!profilePicture ? (
            <label className="uploadContainer">
              <CgProfile className="profileIcon icon" />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
              <p> Upload Profile Picture</p>
            </label>
          ) : (
            <img
              src={profilePicture}
              alt="Profile"
              className="profileIcon icon"
            />
          )}
        </div>

        <div className="buttonSection">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logoutButton ">
              Log Out
            </button>
          ) : (
            <div>
              <button onClick={navigate("/SignIn")}>Log In</button>
              <button onClick={navigate("/SignUp")}>Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
