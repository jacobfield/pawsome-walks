import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "./AuthContext";
import { ThemeContext } from "./ThemeProvider";
export default function AccountOverlay({ profilePicture, setProfilePicture }) {
  const { logout, owner, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { darkTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    logout();
    navigate("/SignIn");
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
    ></div>
  );
}
