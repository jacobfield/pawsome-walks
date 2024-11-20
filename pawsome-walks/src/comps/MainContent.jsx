/* eslint-disable react/prop-types */
import SignUp from "./SignUp.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import WalkDetail from "./WalkDetail.jsx";
import { useAuth } from "./AuthContext.jsx";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignIn from "./SignIn.jsx";
import getAllFavouriteWalksByOwnerId from "../hooks/apiCalls/getAllFavouriteWalksByOwnerId.js";
import filterWalks from "../hooks/filterWalks.js";
import calculateDistance from "../hooks/calculateDistance.js";

//
export default function MainContent({
  allWalks,
  darkTheme,
  navBarProps,
  sortProps,
}) {
  const [favouriteWalks, setFavouriteWalks] = useState([]);
  const location = useLocation();
  const isSignupPage = location.pathname.endsWith("SignUp");
  const isLoginPage = location.pathname.endsWith("SignIn");
  const { owner, isLoggedIn } = useAuth();
  const [showFavourites, setShowFavourites] = useState(false);
  const [filteredWalks, setFilteredWalks] = useState(allWalks);
  const [isFiltered, setIsFiltered] = useState(false);

  const { isSorted, setIsSorted, sortedWalks, setSortedWalks } = sortProps;

  useEffect(() => {
    function fetchUserLocationAndCalculateDistances() {
      if (!Array.isArray(sortedWalks) || sortedWalks.length === 0) {
        // console.warn("No walks to process.");Main.jsx: Walks to display
        return;
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            console.log("userLat", userLat);
            console.log("userLng", userLng);
            const walksWithDistances = sortedWalks.map((walk) => {
              const distance = calculateDistance(
                walk.lat,
                walk.lng,
                userLat,
                userLng
              );

              return { ...walk, distanceToUser: distance };
            });

            const sortedBydistance = walksWithDistances.sort(
              (a, b) => a.distanceToUser - b.distanceToUser
            );

            console.log("Updated sortedWalks with distances:", sortedWalks);
            setSortedWalks(sortedBydistance);
            console.log("Updated ordered walks:", sortedBydistance);
          },
          (error) => {
            console.error("Error getting user's location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
    fetchUserLocationAndCalculateDistances();
  }, [isSorted]);

  //
  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length > 0) {
      setIsFiltered(true);
      setFilteredWalks(filterWalks(allWalks, searchValue));
    } else {
      setIsFiltered(false);
      setFilteredWalks(allWalks);
    }
  };

  const filterFunctions = {
    handleFilter,
    isFiltered,
    setIsFiltered,
    filteredWalks,
    setFilteredWalks,
  };

  useEffect(() => {
    async function fetchFavouritesData() {
      if (isLoggedIn && owner && owner.ownerId) {
        try {
          const favouriteWalks = await getAllFavouriteWalksByOwnerId(
            owner.ownerId
          );
          setFavouriteWalks(favouriteWalks);
        } catch (error) {
          error;

          console.error("Error fetching favourites data", error);
        }
      }
    }
    fetchFavouritesData();
  }, [isLoggedIn, owner]);
  return (
    <div className="app">
      {!isSignupPage && !isLoginPage && (
        <Header
          navBarProps={navBarProps}
          showFavourites={showFavourites}
          setShowFavourites={setShowFavourites}
          filterFunctions={filterFunctions}
        />
      )}
      <div className="mainContent">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                allWalks={allWalks}
                favouriteWalks={favouriteWalks}
                setFavouriteWalks={setFavouriteWalks}
                showFavourites={showFavourites}
                filterFunctions={filterFunctions}
                sortedWalks={sortedWalks}
                isSorted={isSorted}
                sortProps={sortProps}
              />
            }
          />
          <Route
            path="/walk/:walkid"
            element={
              <WalkDetail
                favouriteWalks={favouriteWalks}
                setFavouriteWalks={setFavouriteWalks}
              />
            }
          />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </div>
      {!isSignupPage && !isLoginPage && <Footer />}
    </div>
  );
}

