import { useState } from "react";
import { bouncy } from "ldrs";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import Quote from "./Quote";
import { Link } from "react-router-dom";
import FilterOverlay from "./FilterOverlay";
export default function Main({
  allWalks,
  favouriteWalks,
  showFavourites,
  filterFunctions,
}) {
  bouncy.register();
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [addWalkIsOpen, setAddWalkIsOpen] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const { isFiltered, filteredWalks, setFilteredWalks, setIsFiltered } =
    filterFunctions;

  if (!allWalks) {
    return (
      <div className="loadingContainer">
        <l-bouncy size="45" speed="1.75" color="#64abc1"></l-bouncy>
      </div>
    );
  }
  // console.log("Main All Walks", allWalks);

  const walksToDisplay = isFiltered ? filteredWalks : allWalks;
  if (isFiltered && walksToDisplay.length === 0) {
    return (
      <div>
        <div className="filterOverlayWrapper">
          <FilterOverlay
            filterIsOpen={filterIsOpen}
            setFilterIsOpen={setFilterIsOpen}
            setIsFiltered={setIsFiltered}
            allWalks={allWalks}
            setFilteredWalks={setFilteredWalks}
            filteredWalks={filteredWalks}
            setAddWalkIsOpen={setAddWalkIsOpen}
            addWalkIsOpen={addWalkIsOpen}
          ></FilterOverlay>
        </div>
        <h1 className="noSearchFound">
          No matching walks found. Try adjusting your search!
        </h1>
      </div>
    );
  }

  if (isFiltered && filteredWalks.length != 0) {
    return (
      <section className="walksContainer">
        <Quote></Quote>
        <div className="filterOverlayWrapper">
          <FilterOverlay
            filterIsOpen={filterIsOpen}
            setFilterIsOpen={setFilterIsOpen}
            setIsFiltered={setIsFiltered}
            allWalks={allWalks}
            setFilteredWalks={setFilteredWalks}
            filteredWalks={filteredWalks}
            setAddWalkIsOpen={setAddWalkIsOpen}
            addWalkIsOpen={addWalkIsOpen}
          ></FilterOverlay>
        </div>
        {!showFavourites
          ? filteredWalks &&
            filteredWalks.map((walk) => (
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
          : filteredWalks &&
            filteredWalks
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

  return (
    <section className="walksContainer">
      <Quote></Quote>
      <br></br>
      <div className="filterOverlayWrapper">
        <FilterOverlay
          filterIsOpen={filterIsOpen}
          setFilterIsOpen={setFilterIsOpen}
          setIsFiltered={setIsFiltered}
          allWalks={allWalks}
          setFilteredWalks={setFilteredWalks}
          filteredWalks={filteredWalks}
          setAddWalkIsOpen={setAddWalkIsOpen}
          addWalkIsOpen={addWalkIsOpen}
        ></FilterOverlay>
      </div>
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
