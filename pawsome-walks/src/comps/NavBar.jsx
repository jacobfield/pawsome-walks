import { CiStar } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
// import { GiNightSleep } from "react-icons/gi"; // <GiNightSleep />
import { GiNightSky } from "react-icons/gi"; // <GiNightSky />
import { GiHeraldicSun } from "react-icons/gi"; // <GiHeraldicSun />
import { useState, useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
//
export default function NavBar() {
  const [profilePicture, setProfilePicture] = useState(null);
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  return (
    <div className="navBar">
      <div className="darkMode">
        <button
          className="themeButton"
          onClick={() => setDarkTheme(!darkTheme)}
        >
          {!darkTheme ? (
            <GiNightSky
              className={`ThemeIcon icon fade ${darkTheme ? "dark" : "light"}`}
            />
          ) : (
            <GiHeraldicSun
              style={{ color: "#f8f9fa" }}
              className={`ThemeIcon icon fade ${darkTheme ? "dark" : "light"}`}
            />
          )}
        </button>
      </div>
      <CiStar className="starIcon icon" />
      {!profilePicture ? (
        <CgProfile className="profileIcon icon" />
      ) : (
        <img src={profilePicture} className="profileIcon icon" />
      )}
    </div>
  );
}
