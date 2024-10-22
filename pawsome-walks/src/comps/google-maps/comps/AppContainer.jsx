"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function AppContainer({ children }) {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const themeStyles = darkTheme
    ? {
        backgroundColor: "#f8f9fa",
        color: "#343a40",
      }
    : {
        backgroundColor: "#343a40",
        color: "#f8f9fa",
      };

  return (
    <div
      className="AppContainer"
      style={{
        ...themeStyles,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <hr style={{ visibility: "hidden" }} />
      <div className="form">
        <input
          className="formInput"
          type="checkbox"
          onChange={() => setDarkTheme(!darkTheme)}
          id="themeToggle"
        />
        <label htmlFor="themeToggle" className="switch">
          <span className={`icon ${!darkTheme ? "icon-right" : ""}`}>
            {!darkTheme ? "🌛" : "🌞"}
          </span>
        </label>
      </div>
      <div className="mapContainer">{children}</div>
    </div>
  );
}
