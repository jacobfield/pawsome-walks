/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import OnWalkElements from "./OnWalkElements";
import TypeOfWalk from "./TypeOfWalk";
import DistanceFromUser from "./DistanceFromUser";
import { useAuth } from "./AuthContext";
import removeWalkFromFavourites from "../hooks/apiCalls/removeWalkFromFavourites";
import addWalkToFavourites from "../hooks/apiCalls/addWalkToFavourites";
import FavouriteStar from "./FavouriteStar";
export default function WalkDetailContents({
  walk,
  walkidString,
  favouriteWalks,
  setFavouriteWalks,
}) {
  const walkid = parseInt(walkidString);

  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const { owner, isLoggedIn } = useAuth();
  const ownerid = owner?.ownerId;

  async function toggleFavourites(ownerid, isLoggedIn) {
    if (isLoggedIn && ownerid) {
      try {
        if (favouriteWalks.includes(walkid)) {
          await removeWalkFromFavourites(ownerid, walkid);
          setFavouriteWalks(favouriteWalks.filter((id) => id !== walkid));
        } else {
          await addWalkToFavourites(ownerid, walkid);
          setFavouriteWalks([...favouriteWalks, walkid]);
        }
      } catch (error) {
        console.error("Error updating favourites list", error);
      }
    }
  }
  return (
    <div
      className={`walkDetailContentsContainer ${darkTheme ? "dark" : "light"}`}
    >
      <div className="walkDetailContents">
        <div className="walkDetailIconContainer">
          <Link className="noTextDecoration" to="/">
            <IoReturnDownBack
              className={`backIcon ThemeIcon icon fade ${
                darkTheme ? "dark" : "light"
              }`}
            />
          </Link>
          <h1 className="walkDetailWalkName">{walk.walkname}</h1>
          <FavouriteStar walkid={walkid}></FavouriteStar>
          {/* <CiStar
            className={`starIcon icon walkDetailIcon ${
              favouriteWalks.includes(walkid)
                ? "favouriteList"
                : "notFavouriteList"
            } ${darkTheme ? "dark" : "light"}`}
            onClick={() => toggleFavourites(ownerid, isLoggedIn)}
          /> */}
        </div>
        <h2 className="walkDetailLocation">{walk.location}</h2>
        <div className="walkDetail">
          <TypeOfWalk walk={walk}></TypeOfWalk>
          <OnWalkElements walk={walk}></OnWalkElements>
          <DistanceFromUser walk={walk}></DistanceFromUser>
        </div>
      </div>
      <img
        className="walkDetailImg"
        src={`/walk-photos/walk${walkid}.jpg`}
        alt={walk.walkname}
      />
    </div>
  );
}
