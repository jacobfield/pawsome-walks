// hooks/apiCalls/postOwner.js
export default async function postOwner(ownerData) {
  try {
    const response = await fetch(
      "https://pawsome-walks.vercel.app/api/owners",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ownerData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.message);
      error.code = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting owner data:", error);
    throw error;
  }
}
