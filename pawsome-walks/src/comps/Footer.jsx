import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
export default function Footer() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div className={`footer fade ${darkTheme ? "dark" : "light"}`}>
      <img
        className={`footerLogo logo ${darkTheme ? "dark" : "light"}`}
        alt="Pawsome Walks Logo"
        src="/logo.png"
      ></img>{" "}
      <address className="address copyright">
        <p>
          Email:{" "}
          <a href="mailto:jacob@happywired.com" className="footerEmail">
            contact@pawsomewalks.com
          </a>
        </p>
        &copy; {new Date().getFullYear()} Pawsome Walks Ltd. All rights
        reserved.
      </address>
      <address className="address">
        Pawsome Walks Ltd,{<br></br>}
        Ground Floor,{<br></br>} Hayfield House,{<br></br>} Devonshire St,
        {<br></br>} Chesterfield S41 7ST
      </address>
    </div>
  );
}
