import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import { bouncy } from "ldrs";
import { CiStar } from "react-icons/ci";
import { useAuth } from "./AuthContext";
import getAllFavouriteWalksByOwnerId from "../hooks/apiCalls/getAllFavouriteWalksByOwnerId";

export default function FavouriteStar({
  walkid,
  addToFavourites,
  removeFromFavourites,
}) {
  console.log("FavouriteStar walkid", walkid);

  const [favouriteWalks, setFavouriteWalks] = useState([]);
  const [justFavouritesIds, setJustFavouritesIds] = useState([]);
  const [isFavouritesLoading, setIsFavouritesLoading] = useState(true);

  const { owner, isLoggedIn } = useAuth();
  const { darkTheme } = useContext(ThemeContext);

  // Register bouncy animation only once
  useEffect(() => {
    bouncy.register();
  }, []);

  useEffect(() => {
    async function fetchFavouritesData() {
      setIsFavouritesLoading(true);
      if (isLoggedIn && owner && owner.ownerId) {
        try {
          const favouriteWalksData = await getAllFavouriteWalksByOwnerId(
            owner.ownerId
          );
          setFavouriteWalks(favouriteWalksData);
          console.log("favourite Star favouriteWalks", favouriteWalksData);
        } catch (error) {
          console.error("Error fetching favourites data", error);
        } finally {
          setIsFavouritesLoading(false); // Stop loading once data is retrieved
        }
      }
    }
    fetchFavouritesData();
  }, [isLoggedIn, owner]);

  useEffect(() => {
    if (favouriteWalks && favouriteWalks.length > 0) {
      const favouriteWalksArray = favouriteWalks.map((fave) => fave.walkid);
      setJustFavouritesIds(favouriteWalksArray);
    }
  }, [favouriteWalks]);
  if (!owner) {
    return (
      <CiStar
        className="starIcon icon walkDetailIcon notFavouriteList"
        onClick={() => alert("Please log in to add favourites")}
      />
    );
  }
  if (isFavouritesLoading) {
    return (
      <l-bouncy
        size="30"
        speed="1.75"
        color="#64abc1"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      ></l-bouncy>
    );
  }

  return justFavouritesIds.includes(walkid) ? (
    <CiStar
      className="starIcon icon walkDetailIcon favouriteList walkDetailStar"
      onClick={removeFromFavourites}
    />
  ) : (
    <CiStar
      className="starIcon icon walkDetailIcon notFavouriteList walkDetailStar"
      onClick={addToFavourites}
    />
  );
}
