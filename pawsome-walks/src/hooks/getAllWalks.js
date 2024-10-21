export default async function getAllWalks() {
  try {
    const response = await fetch("https://pawsome-walks.vercel.app/api/walks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Ensure the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    // Check if the data is inside the "data" field
    const walksData = responseData.data ? responseData.data : [];
    return walksData;
  } catch (error) {
    console.error(`Error fetching walks: ${error}`);
    return [];
  }
}
