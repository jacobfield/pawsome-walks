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
import filterWalks from "../hooks/filterWalks.js";
import useDistanceFromUser from "../hooks/useDistanceFromUser.js";
import useGetFavouriteData from "../hooks/useGetFavouriteData.js";
import useAlphabeticalSort from "../hooks/useAlphabeticalSort.js";

// MainContent component
export default function MainContent({ allWalks, navBarProps, sortProps }) {
  const [favouriteWalks, setFavouriteWalks] = useState([]);
  const location = useLocation();
  const isSignupPage = location.pathname.endsWith("SignUp");
  const isLoginPage = location.pathname.endsWith("SignIn");
  const { owner, isLoggedIn } = useAuth();
  const [showFavourites, setShowFavourites] = useState(false);
  const [filteredWalks, setFilteredWalks] = useState(allWalks);
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const {
    isSorted,
    setIsSorted,
    sortedWalks,
    setSortedWalks,
    distanceSort,
    setDistanceSort,
    nameSort,
    setNameSort,
  } = sortProps;
  // Calculate distance from user
  useDistanceFromUser(
    isFiltered ? filteredWalks : allWalks,
    setSortedWalks,
    isSorted,
    distanceSort,
    nameSort
  );

  useAlphabeticalSort(
    isFiltered ? filteredWalks : allWalks,
    setSortedWalks,
    isSorted,
    distanceSort,
    nameSort
  );

  // handle filters
  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length > 0) {
      const filteredResults = filterWalks(allWalks, searchValue);
      setIsFiltered(true);
      setShowFallback(false);
      setFilteredWalks(filteredResults);
      if (filteredResults.length === 0) {
        console.log("No matching walks found");
        setShowFallback(true);
      }
    } else {
      setIsFiltered(false);
      setFilteredWalks(allWalks);
      setShowFallback(false);
    }
  };
  // constructing filter functions for passing props down easier
  const filterFunctions = {
    handleFilter,
    isFiltered,
    setIsFiltered,
    filteredWalks,
    setFilteredWalks,
  };
  // Get favourite walks hook
  useGetFavouriteData(isLoggedIn, owner, setFavouriteWalks);
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
                showFallback={showFallback}
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
