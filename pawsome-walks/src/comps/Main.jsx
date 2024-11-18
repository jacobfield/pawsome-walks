/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
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
  sortProps,
}) {
  bouncy.register();
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [addWalkIsOpen, setAddWalkIsOpen] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const { logout, owner, isLoggedIn } = useAuth();
  const { isFiltered, filteredWalks, setFilteredWalks, setIsFiltered } =
    filterFunctions;

  if (!allWalks) {
    return (
      <div className="loadingContainer">
        <l-bouncy size="45" speed="1.75" color="#64abc1"></l-bouncy>
      </div>
    );
  }
  const isAdmin = { isLoggedIn, ownerid: owner?.ownerid };
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
            sortProps={sortProps}
          />
        </div>
        <h1 className="noSearchFound">
          No matching walks found. Try adjusting your search!
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
            allWalks={allWalks}
            setFilteredWalks={setFilteredWalks}
            filteredWalks={filteredWalks}
            setAddWalkIsOpen={setAddWalkIsOpen}
            addWalkIsOpen={addWalkIsOpen}
          />
        </div>
        {!showFavourites
          ? filteredWalks &&
            filteredWalks.map((walk) => {
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
          : filteredWalks &&
            filteredWalks
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
        ? allWalks &&
          allWalks.map((walk) => {
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
        : allWalks &&
          allWalks
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
      {isAdmin.isLoggedIn === true && isAdmin.ownerid === 4
        ? allWalks &&
          allWalks
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
