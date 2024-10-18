"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function AppContainer({ children }) {
  const { darkTheme } = useContext(ThemeContext); // Only need darkTheme to apply styles

  return (
    <div className={`AppContainer fade ${darkTheme ? "dark" : "light"}`}>
      {/* No need for the form and toggle here */}
      <div className="mapContainer">{children}</div>
    </div>
  );
}
