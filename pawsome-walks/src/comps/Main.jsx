import { useState } from "react";
import { bouncy } from "ldrs";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import Quote from "./Quote";

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
      <Quote></Quote>
      {allWalks &&
        allWalks.map((walk) => (
          <div
            key={walk.walkid}
            className={`walk fade ${darkTheme ? "dark" : "light"}`}
          >
            <img
              className="walkPreviewImg"
              src={`walk-photos/${walk.photopath}.jpg`}
              alt={walk.walkname}
            />
            <div className="walkPreviewTextContainer">
              <h2 className="walkPreviewTitle">{walk.walkname}</h2>
              <p className="walkPreviewLocation">{walk.location}</p>
              <div
                className={`walkPreviewDetails fade ${
                  darkTheme ? "dark" : "light"
                }`}
              >
                <p>{walk.walktype.map((type) => type).join(", ")}</p>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}
