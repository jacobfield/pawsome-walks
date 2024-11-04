export default async function getProfilePicUrl(searchIds) {
  try {
    // Ensure searchIds is defined and contains the expected properties
    if (!searchIds || !searchIds.ownerId || !searchIds.picId) {
      throw new Error(
        "Invalid searchIds object. ownerId and picId are required."
      );
    }

    const { ownerId, picId } = searchIds;

    const response = await fetch(
      `https://pawsome-walks.vercel.app/api/owners/${ownerId}/${picId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Ensure the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    // Return the entire row of data
    return responseData.data || {}; // Return an empty object if no data
  } catch (error) {
    // Use default values for ownerId and picId in the error message
    const ownerId = searchIds?.ownerId || "undefined";
    const picId = searchIds?.picId || "undefined";

    console.error(
      `Error fetching URL with ownerId: ${ownerId} / picId: ${picId}: ${error}`
    );
    return {}; // Return an empty object on error
  }
}
