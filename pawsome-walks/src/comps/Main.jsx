import { useState } from "react";
import { bouncy } from "ldrs";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import Quote from "./Quote";
import { Link } from "react-router-dom";
export default function Main({
  allWalks,
  favouriteWalks,
  setFavouriteWalks,
  showFavourites,
}) {
  // initialising loading state holder
  bouncy.register();
  // const [walks, setWalks] = useState(
  //   Array.from({ length: 30 }, (_, i) => i + 1)
  // );
  const { darkTheme } = useContext(ThemeContext);

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

      {!showFavourites
        ? allWalks &&
          allWalks.map((walk) => (
            <Link
              className="noTextDecoration"
              to={`/walk/${walk.walkid}`}
              key={walk.walkid}
            >
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
            </Link>
          ))
        : allWalks &&
          allWalks
            .filter((walk) =>
              favouriteWalks.some((fave) => fave.walkid === walk.walkid)
            )
            .map((walk) => (
              <Link
                className="noTextDecoration"
                to={`/walk/${walk.walkid}`}
                key={walk.walkid}
              >
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
              </Link>
            ))}
    </section>
  );
}
