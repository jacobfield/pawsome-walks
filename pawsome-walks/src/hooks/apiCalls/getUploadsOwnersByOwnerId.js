export default async function getUploadsOwnersByOwnerId(ownerId) {
  try {
    const response = await fetch(
      `https://pawsome-walks.vercel.app/api/uploadsOwner/${ownerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ); // Ensure the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    const uploadsOwnersData = responseData.data ? responseData.data : [];
    return uploadsOwnersData;
  } catch (error) {
    console.error(`Error fetching uploads for owner ${ownerId}: ${error}`);
    return [];
  }
}
