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
export default function WalkDetailContents({
  walk,
  walkid,
  favouriteWalks,
  setFavouriteWalks,
}) {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const { owner, isLoggedIn } = useAuth();
  const ownerid = owner?.ownerId;
  console.log("outside toggleFavourites: owner", owner);

  console.log("outside toggleFavourites: ownerid", ownerid);
  async function toggleFavourites(ownerid, isLoggedIn) {
    console.log("inside toggleFavourites line 1: ownerid", ownerid);
    console.log(
      "inside toggleFavourites line 1: ownerid.ownerId",
      ownerid.ownerId
    );
    if (isLoggedIn && ownerid) {
      console.log("inside toggleFavourites if statement: ownerid", ownerid);

      try {
        console.log("inside toggleFavourites try: ownerid", ownerid);

        if (favouriteWalks.includes(walkid)) {
          console.log(
            "inside toggleFavourites try, before removeWalksFromFavourites: ownerid",
            ownerid
          );

          await removeWalkFromFavourites(ownerid, walkid);
          setFavouriteWalks(favouriteWalks.filter((id) => id !== walkid));
        }
        if (!favouriteWalks.includes(walkid)) {
          console.log(
            "inside toggleFavourites try, before addWalksToFavourites: ownerid",
            ownerid
          );

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

          <CiStar
            className={`starIcon icon walkDetailIcon ${
              favouriteWalks.includes(walkid)
                ? "favouriteList"
                : "notFavouriteList"
            }`}
            onClick={() => toggleFavourites(ownerid, isLoggedIn)}
          />
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

// Create function that does the following:
// if walkid is not in favouriteWalksId, star icon should add it upon click by calling addWalkToFavourites(ownerid, walkid)
// if walkid is in favouriteWalksId, star icon should remove it upon click by calling removeWalkFromFavourites(ownerid, walkid)
