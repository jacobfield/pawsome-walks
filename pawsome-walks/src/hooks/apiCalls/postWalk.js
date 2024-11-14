export default async function postWalk(walkData) {
  console.log("Post Walk API Call: Received walkData:", walkData);
  try {
    const response = await fetch("https://pawsome-walks.vercel.app/api/walks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(walkData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.message);
      error.code = response.status;
      throw error;
    }
    return await response.json();
  } catch (error) {
    console.error("Error posting walk data:", error);
    throw error;
  }
}
