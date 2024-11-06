// in main, ifLoggedIn make api call to retrieve list of favourites, depending on ownerid
// if walk is not in favourites, function to add it to favourites
// if walk is in favourites, function to remove it from favourites
// toggle these functions, depending on whether the walk is in favourites or not; if in, star button will remove it, if not, star button will add it
// if user is not logged in, star button make a little alert thing telling user to log in for favourites feature
// If user is logged in, filter through list of walks where walk id is in favourites list

export default async function addWalkToFavourites(ownerid, walkid) {
    console.log("Attempting to add walk to favourites: ownerid", ownerid, "walkid", walkid);
  try {
    const response = await fetch(
      "https://pawsome-walks.vercel.app/api/ownerFavouriteWalks",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerid, walkid }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.message);
      error.code = response.status;
      throw error;
    }
    console.log(walkid, "added to favourites");
    return await response.json();
  } catch (error) {
    console.error("Error posting owner data:", error);
    throw error;
  }
}