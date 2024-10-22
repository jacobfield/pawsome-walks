"use client";
import { createContext, useState, useEffect } from "react";
export const ThemeContext = createContext({});

export default function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(
    typeof window !== "undefined" &&
      localStorage.getItem("darkTheme") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme);
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
