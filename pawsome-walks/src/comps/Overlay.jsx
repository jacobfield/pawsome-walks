/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "./AuthContext";
import { ThemeContext } from "./ThemeProvider";
import uploadProfilePicture from "../hooks/apiCalls/uploadProfilePicture";
import getUploadsOwnersByOwnerId from "../hooks/apiCalls/getUploadsOwnersByOwnerId";
import getProfilePicUrl from "../hooks/apiCalls/getProfilePicUrl";
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
      const searchIds = await getUploadsOwnersByOwnerId(ownerId);
      const uploadRowData = await getProfilePicUrl(searchIds);
      // need to fix the actual posting of the image, as I think I have removed the actual upload aspect of it

      // then need to make the request to ensure that the url is conditionally rendered

      // extract the url here
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
          {/* 1 If owner and logged in */}
          {owner && isLoggedIn && owner.username ? (
            //  2 if no profile picture, show placeholder and upload button
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
                {selectedFile && (
                  <button onClick={handleUploadClick}>Upload</button>
                )}
              </label>
            ) : (
              // 2 else show profile picture
              <div>
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="overlayLogo"
                />
              </div>
            )
          ) : (
            // 1 else show logo and message if not logged in
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

// need to fix the actual posting of the image, as I think I have removed the actual upload aspect of it

// then need to make the request to ensure that the url is conditionally rendered
