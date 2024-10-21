import { useState } from "react";
import { bouncy } from "ldrs";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function Main({ allWalks }) {
  // initialising loading state holder
  bouncy.register();
  const [walks, setWalks] = useState(
    Array.from({ length: 30 }, (_, i) => i + 1)
  );
  const { darkTheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState("Loading...");

  if (!allWalks) {
    return (
      <div className="loadingContainer">
        <l-bouncy size="45" speed="1.75" color="#64abc1"></l-bouncy>
      </div>
    );
  }
  return (
    <section className="walksContainer">
      {allWalks &&
        allWalks.map((walk) => (
          <div
            key={walk.walkid}
            className={`walk fade ${darkTheme ? "dark" : "light" }`}
          >
            <img
              className="walkPreviewImg"
              src={`walk-photos/${walk.photopath}.jpg`}
              alt={walk.walkname}
            />
            <h2 className="walkPreviewTitle">{walk.walkname}</h2>
          </div>
        ))}
      {/* ))}
      {walks.map((walk) => (
        <div key={walk} className="walk"></div>
      ))} */}
    </section>
  );
}
