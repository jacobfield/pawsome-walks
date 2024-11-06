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
      if (isLoggedIn && owner && owner.ownerId) {
        try {
          const favouriteWalksData = await getAllFavouriteWalksByOwnerId(
            owner.ownerId
          );
          setFavouriteWalks(favouriteWalksData);
          console.log("favourite Star favouriteWalks", favouriteWalksData);
        } catch (error) {
          console.error("Error fetching favourites data", error);
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

  return justFavouritesIds.includes(walkid) ? (
    <CiStar
      className="starIcon icon walkDetailIcon favouriteList"
      onClick={removeFromFavourites}
    />
  ) : (
    <CiStar
      className="starIcon icon walkDetailIcon notFavouriteList"
      onClick={addToFavourites}
    />
  );
}
