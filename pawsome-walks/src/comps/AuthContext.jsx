// AuthContext.js
import { createContext, useState, useContext } from "react";

// Create the context
export const AuthContext = createContext();

// Provide the context
export function AuthProvider({ children }) {
  const [owner, setOwner] = useState(null); // Stores the owner's data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Stores login status

  // Function to log in and set the context state
  const login = (ownerData) => {
    setOwner(ownerData);
    setIsLoggedIn(true); // Set isLoggedIn to true when login is successful
  };

  // Function to log out and clear the context state
  const logout = () => {
    setOwner(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ owner, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext easily in other components
export function useAuth() {
  return useContext(AuthContext);
}
