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
import useDistanceFromUser from "../hooks/useDistanceFromUser.js";
import useGetFavouriteData from "../hooks/useGetFavouriteData.js";

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

  useDistanceFromUser(sortedWalks, setSortedWalks, isSorted);
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
