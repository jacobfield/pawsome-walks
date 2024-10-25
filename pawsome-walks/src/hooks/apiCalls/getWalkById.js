export default async function getWalkById(walkid) {
  try {
    const response = await fetch(
      `https://pawsome-walks.vercel.app/api/walks/${walkid}`,
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

    const walkData = responseData.data ? responseData.data : [];
    return walkData;
  } catch (error) {
    console.error(`Error fetching walk number ${walkid}: ${error}`);
    return [];
  }
}
