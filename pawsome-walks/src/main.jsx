import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "./App.css";
import "./styles/small.css";
import "./styles/medium.css";
import "./styles/large.css";
import "./styles/scrollBar.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
