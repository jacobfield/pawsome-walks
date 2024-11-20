/* eslint-disable react/prop-types */
import SignUp from "./SignUp.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import WalkDetail from "./WalkDetail.jsx";
import { useAuth } from "./AuthContext.jsx";
import { useState } from "react";
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
import useFilterBoxes from "../hooks/useFilterBoxes.js";

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

  const { isSorted, setIsSorted, sortedWalks, setSortedWalks } = sortProps;
  // Calculate distance from user
  useDistanceFromUser(isFiltered ? filteredWalks : allWalks, setSortedWalks, isSorted);
  // handle filters
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
