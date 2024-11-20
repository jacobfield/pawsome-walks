import { useEffect } from "react";
import getAllFavouriteWalksByOwnerId from "./apiCalls/getAllFavouriteWalksByOwnerId";

export default function useGetFavouriteData(
  isLoggedIn,
  owner,
  setFavouriteWalks
) {
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
}
