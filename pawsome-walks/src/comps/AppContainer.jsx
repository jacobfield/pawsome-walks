"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function AppContainer({ children }) {
  const { darkTheme } = useContext(ThemeContext); 

  return (
    <div className={`AppContainer fade ${darkTheme ? "dark" : "light"}`}>
  
      <div className="mapContainer">{children}</div>
    </div>
  );
}
