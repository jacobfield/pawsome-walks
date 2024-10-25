export default async function postOwner(newOwner) {
  try {
    const response = await fetch(
      "https://pawsome-walks.vercel.app/api/owners",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOwner),
      }
    );
    // Ensure the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const ownerData = responseData.data ? responseData.data : [];
    return ownerData;
  } catch (error) {
    console.error(`Error posting owner: ${error}`);
    return [];
  }
}
