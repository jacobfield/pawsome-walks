/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "./AuthContext";
import { ThemeContext } from "./ThemeProvider";
import uploadProfilePicture from "../hooks/apiCalls/uploadProfilePicture";
import getUploadsOwnersByOwnerId from "../hooks/apiCalls/getUploadsOwnersByOwnerId";
//
export default function Overlay({ navBarProps }) {
  const { logout, owner, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const { isOpen, setIsOpen, profilePicture, setProfilePicture } = navBarProps;
  const [selectedFile, setSelectedFile] = useState(null);

  async function getProfilePicture() {
    if (isLoggedIn == true) {
      const ownerId = owner.ownerId;
      const searchId = await getUploadsOwnersByOwnerId(ownerId);
    }
  }

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  // Handle profile picture upload to backend
  const handleUploadClick = async () => {
    if (!selectedFile) return;
    try {
      const uploadedImageUrl = await uploadProfilePicture(selectedFile);
      setProfilePicture(uploadedImageUrl); // Update local state
      setSelectedFile(null); // Clear the selected file
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };
  // handle sign in and sign up
  const handleSignIn = () => {
    setIsOpen(false);
    navigate("/SignIn");
  };

  const handleSignUp = () => {
    setIsOpen(false);
    navigate("/SignUp");
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
        X
      </button>
      <div className="overlayContent">
        <div className="profileSection">
          {owner && isLoggedIn && owner.username ? (
            !profilePicture ? (
              <label className="uploadContainer">
                <CgProfile className="placeholderImage" />
                <p>Upload Profile Picture</p>
                <div className="fileInputWrapper">
                  <input
                    className="uploadInput"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </div>
              </label>
            ) : (
              <div>
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="overlayLogo"
                />
                {selectedFile && (
                  <button onClick={handleUploadClick}>Upload</button>
                )}
              </div>
            )
          ) : (
            <div>
              <img
                className="overlayLogo"
                alt="Pawsome Walks Logo"
                src="/logo.png"
              />
              <p>Log in for more features!</p>
            </div>
          )}
        </div>

        <div className="buttonSection">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logoutButton ">
              Log Out
            </button>
          ) : (
            <div>
              <button
                className={`overlayButton ${darkTheme ? "dark" : "light"}`}
                onClick={handleSignIn}
              >
                Log In
              </button>
              <button
                className={`overlayButton ${darkTheme ? "dark" : "light"}`}
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
