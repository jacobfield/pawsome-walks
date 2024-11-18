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
import ApproveRejectWalk from "./approveRejectWalk";
export default function WalkDetailContents({
  walk,
  walkidString,
  favouriteWalks,
  setFavouriteWalks,
  approved,
}) {
  const walkid = parseInt(walkidString);

  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const { owner, isLoggedIn } = useAuth();
  const ownerid = owner?.ownerId;

  async function addToFavourites(ownerid, walkid) {
    try {
      await addWalkToFavourites(ownerid, walkid);
      setFavouriteWalks((prevFavourites) => [...prevFavourites, walkid]);
      console.log("added favourite");
      window.location.reload();
    } catch (error) {
      console.error("Error adding walk to favourites", error);
    }
  }

  async function removeFromFavourites(ownerid, walkid) {
    try {
      await removeWalkFromFavourites(ownerid, walkid);
      setFavouriteWalks((prevFavourites) =>
        prevFavourites.filter((id) => id !== walkid)
      );
      console.log("removed favourite");
      window.location.reload();
    } catch (error) {
      console.error("Error removing walk from favourites", error);
    }
  }
  const primarySrc = `/walk-photos/walk${walkid}.jpg`;
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
          {approved ? (
            <FavouriteStar
              walkid={walkid}
              addToFavourites={() => addToFavourites(ownerid, walkid)}
              removeFromFavourites={() => removeFromFavourites(ownerid, walkid)}
            ></FavouriteStar>
          ) : (
            <ApproveRejectWalk walk={walk}></ApproveRejectWalk>
          )}
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
        alt={walk.walkname}
        src={primarySrc}
        onError={(e) => {
          e.target.src = walk.photopath;
        }}
      />
    </div>
  );
}
