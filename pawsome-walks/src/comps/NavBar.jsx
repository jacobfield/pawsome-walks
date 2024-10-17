import { CiStar } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
export default function NavBar() {
  const [profilePicture, setProfilePicture] = useState(null);
  return (
    <div className="navBar">
      <div className="darkMode"></div>
      <CiStar className="starIcon icon" />
      {!profilePicture ? (
        <CgProfile className="profileIcon icon" />
      ) : (
        <img src={profilePicture} className="profileIcon icon" />
      )}
    </div>
  );
}
