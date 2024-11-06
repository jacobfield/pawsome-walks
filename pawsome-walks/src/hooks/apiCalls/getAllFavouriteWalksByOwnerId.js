// in main, ifLoggedIn make api call to retrieve list of favourites, depending on ownerid
// if walk is not in favourites, function to add it to favourites
// if walk is in favourites, function to remove it from favourites
// toggle these functions, depending on whether the walk is in favourites or not; if in, star button will remove it, if not, star button will add it
// if user is not logged in, star button make a little alert thing telling user to log in for favourites feature
// If user is logged in, filter through list of walks where walk id is in favourites list

export default async function getAllFavouriteWalksByOwnerId(ownerid) {
  try {
    const response = await fetch(
      `https://pawsome-walks.vercel.app/api/ownerFavouriteWalks/${ownerid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Http Error originated in getAllFavouriteWalksByOwnerId: ${response.status}`
      );
    }
    const responseData = await response.json();
    const favouriteWalksData = responseData.data ? responseData.data : [];
    return favouriteWalksData;
  } catch (error) {
    console.error(
      `Error fetching all favourite walks by owner id. Http Error originated in getAllFavouriteWalksByOwnerId: ${ownerid}: ${error}`
    );
    return [];
  }
}
