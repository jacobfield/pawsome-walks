import { CiStar } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
// import { GiNightSleep } from "react-icons/gi"; // <GiNightSleep />
import { GiNightSky } from "react-icons/gi"; // <GiNightSky />
import { GiHeraldicSun } from "react-icons/gi"; // <GiHeraldicSun />
import { useState, useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

//
export default function NavBar({
  navBarProps,
  toggleFavourites,
  showFavourites,
}) {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const { isOpen, setIsOpen, profilePicture, setProfilePicture } = navBarProps;
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
      <CiStar
        onClick={toggleFavourites}
        className={`starIcon icon ${
          showFavourites ? "showFavourites" : "notShowFavourites"
        } ${darkTheme ? "dark" : "light"}`}
      />

      {!profilePicture ? (
        <CgProfile
          className="profileIcon icon"
          onClick={() => setIsOpen(!isOpen)}
        />
      ) : (
        <img
          src={profilePicture}
          className="profileIcon icon"
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
    </div>
  );
}
