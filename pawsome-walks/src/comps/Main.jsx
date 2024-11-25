/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { bouncy } from "ldrs";
import { ThemeContext } from "./ThemeProvider";
import Quote from "./Quote";
import { Link } from "react-router-dom";
import FilterOverlay from "./FilterOverlay";
import { useAuth } from "./AuthContext";

export default function Main({
  allWalks,
  favouriteWalks,
  showFavourites,
  filterFunctions,
  sortedWalks,
  isSorted,
  sortProps,
}) {
  bouncy.register();
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [addWalkIsOpen, setAddWalkIsOpen] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const { logout, owner, isLoggedIn } = useAuth();
  const isAdmin = { isLoggedIn, ownerid: owner?.ownerId };
  const { isFiltered, filteredWalks, setFilteredWalks, setIsFiltered } =
    filterFunctions;
  // console.log("Main.jsx sortedWalks", sortedWalks);
  if (!allWalks || allWalks.length === 0) {
    return (
      <div className="loadingContainer">
        <l-bouncy size="45" speed="1.75" color="#64abc1"></l-bouncy>
      </div>
    );
  }
  // Determining which walks to display
  let walksToDisplay = isSorted
    ? sortedWalks
    : isFiltered
    ? filteredWalks
    : allWalks;

  // If the filters mean that there are no walks to display, show a message (CURRENTLY NOT WORKING - INSTEAD IT RESETS THE STATE??)
  if (isFiltered && filteredWalks.length === 0) {
    return (
      <div>
        <div className="filterOverlayWrapper">
          <FilterOverlay
            filterIsOpen={filterIsOpen}
            setFilterIsOpen={setFilterIsOpen}
            setIsFiltered={setIsFiltered}
            isFiltered={isFiltered}
            allWalks={allWalks}
            setFilteredWalks={setFilteredWalks}
            filteredWalks={filteredWalks}
            setAddWalkIsOpen={setAddWalkIsOpen}
            addWalkIsOpen={addWalkIsOpen}
            sortProps={sortProps}
          />
        </div>
        <h1 className="noSearchFound">
          {isSorted ? (
            "No sorted walks found."
          ) : isFiltered ? (
            "No matching walks found. Try adjusting your search!"
          ) : (
            <div className="loadingContainer">
              <l-bouncy size="45" speed="1.75" color="#64abc1"></l-bouncy>
            </div>
          )}
        </h1>
      </div>
    );
  }
  if (isFiltered && filteredWalks.length !== 0) {
    return (
      <section className="walksContainer">
        <Quote />
        <div className="filterOverlayWrapper">
          <FilterOverlay
            filterIsOpen={filterIsOpen}
            setFilterIsOpen={setFilterIsOpen}
            setIsFiltered={setIsFiltered}
            isFiltered={isFiltered}
            allWalks={allWalks}
            setFilteredWalks={setFilteredWalks}
            filteredWalks={filteredWalks}
            setAddWalkIsOpen={setAddWalkIsOpen}
            addWalkIsOpen={addWalkIsOpen}
            sortProps={sortProps}
          />
        </div>
        {/* Conditionally showing filtered list. If no filtered list, show all walks */}
        {!showFavourites
          ? filteredWalks &&
            walksToDisplay.map((walk) => {
              const primarySrc = `walk-photos/${walk.photopath}.jpg`;
              return walk.approved ? (
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
                      alt={walk.walkname}
                      src={primarySrc}
                      onError={(e) => {
                        e.target.src = walk.photopath;
                      }}
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
              ) : null;
            })
          : /* If there are filtered walks, walksToDisplay will equal filtered walks, and will display them */
            walksToDisplay &&
            walksToDisplay
              .filter((walk) =>
                favouriteWalks.some((fave) => fave.walkid === walk.walkid)
              )
              .map((walk) => {
                const primarySrc = `walk-photos/${walk.photopath}.jpg`;
                return walk.approved ? (
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
                        alt={walk.walkname}
                        src={primarySrc}
                        onError={(e) => {
                          e.target.src = walk.photopath;
                        }}
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
                ) : null;
              })}
      </section>
    );
  }

  return (
    <section className="walksContainer">
      <Quote />
      <br />
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
          sortProps={sortProps}
        />
      </div>
      {!showFavourites
        ? walksToDisplay &&
          walksToDisplay.map((walk) => {
            const primarySrc = `walk-photos/${walk.photopath}.jpg`;
            return walk.approved ? (
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
                    alt={walk.walkname}
                    src={primarySrc}
                    onError={(e) => {
                      e.target.src = walk.photopath;
                    }}
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
            ) : null;
          })
        : walksToDisplay &&
          walksToDisplay
            .filter((walk) =>
              favouriteWalks.some((fave) => fave.walkid === walk.walkid)
            )
            .map((walk) => {
              const primarySrc = `walk-photos/${walk.photopath}.jpg`;
              return walk.approved ? (
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
                      alt={walk.walkname}
                      src={primarySrc}
                      onError={(e) => {
                        e.target.src = walk.photopath;
                      }}
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
              ) : null;
            })}
      {/* If admin is logged in (me) then show not yet approved walks, else show nothing */}
      {isAdmin.isLoggedIn === true && isAdmin.ownerid === 4 && !showFavourites
        ? walksToDisplay &&
          walksToDisplay
            .filter((walk) => walk.approved === false)
            .map((walk) => {
              const primarySrc = `walk-photos/${walk.photopath}.jpg`;
              return (
                <Link
                  className="noTextDecoration"
                  to={`/walk/${walk.walkid}`}
                  key={walk.walkid}
                >
                  <div
                    key={walk.walkid}
                    className={`walk fade green ${
                      darkTheme ? "dark" : "light"
                    }`}
                  >
                    <img
                      className="walkPreviewImg"
                      alt={walk.walkname}
                      src={primarySrc}
                      onError={(e) => {
                        e.target.src = walk.photopath;
                      }}
                    />
                    <div
                      className="walkPreviewTextContainer 
                    "
                    >
                      <h2 className="walkPreviewTitle">{walk.walkname}</h2>
                      <p className="walkPreviewLocation">{walk.location}</p>

                      <div
                        className={`walkPreviewDetails fade ${
                          darkTheme ? "dark" : "light"
                        } `}
                      >
                        <h3 className="pendingApproval">Pending approval</h3>
                        {/* <p>{walk.walktype.map((type) => type).join(", ")}</p> */}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
        : null}
    </section>
  );
}
