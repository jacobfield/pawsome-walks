// AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [owner, setOwner] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (ownerData) => {
    setOwner(ownerData);
    setIsLoggedIn(true);
    // console.log(ownerData.username, "logged in! - AuthContext.jsx");
    // Name to access owner = loggedInOwner
    localStorage.setItem("loggedInOwner", JSON.stringify(ownerData));
    // Name to access isLoggedIn = isLoggedIn
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setOwner(null);
    setIsLoggedIn(false);
    // console.log("Logged out");
    localStorage.removeItem("loggedInOwner");
    localStorage.setItem("isLoggedIn", "false");
  };

  useEffect(() => {
    const storedOwner = localStorage.getItem("loggedInOwner");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedOwner) {
      setOwner(JSON.parse(storedOwner));
      setIsLoggedIn(storedIsLoggedIn === "true");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ owner, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
