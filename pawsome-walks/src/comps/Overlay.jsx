import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "./AuthContext";
import { ThemeContext } from "./ThemeProvider";
import uploadProfilePicture from "../hooks/apiCalls/uploadProfilePicture";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SECRET_KEY
);

export default function Overlay({ navBarProps }) {
  const { logout, owner, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const { isOpen, setIsOpen, profilePicture, setProfilePicture } = navBarProps;
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    async function getProfilePic() {
      if (!isLoggedIn || !owner?.ownerId) return;
      try {
        const { data, error } = await supabase
          .from("uploads")
          .select("*")
          .eq("ownerid", owner.ownerId);

        if (error) throw error;

        if (data && data.length > 0) {
          const profilePicUrl = data[0].url; // Adjust based on actual data structure
          setProfilePicture(profilePicUrl);
        }
      } catch (error) {
        console.error("Error getting profile picture:", error);
      }
    }
    getProfilePic();
  }, [isLoggedIn, owner, setProfilePicture]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    window.location.reload();
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile || !owner?.ownerId) return;
    try {
      const uploadedImageUrl = await uploadProfilePicture(
        selectedFile,
        owner.ownerId
      );
      setProfilePicture(uploadedImageUrl);
      setSelectedFile(null);
      window.location.reload();
      // Clear the selected file
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

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
                {selectedFile && (
                  <button onClick={handleUploadClick}>Upload</button>
                )}
              </label>
            ) : (
              <div>
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="profilePicture"
                />
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
            <button onClick={handleLogout} className="logoutButton">
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
