export default async function getAllOwners() {
  try {
    const response = await fetch(
      "https://pawsome-walks.vercel.app/api/owners",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    const walksData = responseData.data ? responseData.data : [];
    return walksData;
  } catch (error) {
    console.error(`Error fetching walks: ${error}`);
    return [];
  }
}
