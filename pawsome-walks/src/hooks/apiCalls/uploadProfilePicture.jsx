export default async function uploadProfilePicture(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("https://pawsome-walks.vercel.app/api/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message);
    error.code = response.status;
    throw error;
  }

  const data = await response.json();
  return data.imageUrl; // Assumes backend returns the URL of the uploaded image
}
