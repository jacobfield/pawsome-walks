// hooks/apiCalls/postOwner.js
export default async function postOwner(ownerData) {
  const response = await fetch("https://pawsome-walks.vercel.app/api/owners", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ownerData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // Create an error with a message and status code
    const error = new Error(errorData.message);
    error.code = response.status; // Store the status code for error handling
    throw error;
  }

  return await response.json();
}
