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

//
export default function MainContent({ allWalks, darkTheme, navBarProps }) {
  const [favouriteWalks, setFavouriteWalks] = useState([]);
  const location = useLocation();
  const isSignupPage = location.pathname.endsWith("SignUp");
  const isLoginPage = location.pathname.endsWith("SignIn");
  const { owner, isLoggedIn } = useAuth();
  // console.log("owner", owner);
  // console.log("ownerId", owner.ownerId);

  useEffect(() => {
    async function fetchFavouritesData() {
      if (isLoggedIn && owner && owner.ownerId) {
        try {
          const favouriteWalks = await getAllFavouriteWalksByOwnerId(
            owner.ownerId
          );
          setFavouriteWalks(favouriteWalks);
          console.log("favouriteWalks", favouriteWalks);
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
          favouriteWalks={favouriteWalks}
          setFavouriteWalks={setFavouriteWalks}
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
