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
export default function MainContent({ allWalks, darkTheme, navBarProps }) {
  const [favouriteWalks, setFavouriteWalks] = useState([]);
  const location = useLocation();
  const isSignupPage = location.pathname.endsWith("SignUp");
  const isLoginPage = location.pathname.endsWith("SignIn");
  const { owner, isLoggedIn } = useAuth();
  const [showFavourites, setShowFavourites] = useState(false);
  const [filteredWalks, setFilteredWalks] = useState(allWalks);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [sortedWalks, setSortedWalks] = useState(allWalks);

  const sortProps = {
    isSorted,
    setIsSorted,
    sortedWalks,
    setSortedWalks,
  };

  function sortWalksByDistance(sortedWalks) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          for (let i = 0; i < sortedWalks.length; i++) {
            const distance = calculateDistance(
              sortedWalks[i].lat,
              sortedWalks[i].lng,
              userLat,
              userLng
            );
            sortedWalks[i].distanceToUser = distance;
          }

          console.log("Updated sortedWalks with distances:", sortedWalks);
        },
        (error) => {
          console.error("Error getting user's location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
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
// might be worth calculating the distance and altering the state in a highter level component, then passing it down that way. Then, if the box is checked, alter the management state, which renders it in Main.jsx
// this way, the state is only altered when the box is checked, and the distance is only calculated at a higher component; it might make it a lot easier to manage the state, if the only state being mutated is the toggle feature
