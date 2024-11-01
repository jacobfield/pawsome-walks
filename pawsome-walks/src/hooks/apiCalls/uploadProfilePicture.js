export default async function uploadProfilePicture(file) {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    const error = new Error(
      "Invalid file type. Please upload a valid image file."
    );
    error.code = 400;
    alert(error);
    throw error;
  }

  const formData = new FormData();
  formData.append("file", file);
  console.log("formData:", formData);
  const response = await fetch("https://pawsome-walks.vercel.app/api/uploads", {
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
  console.log("Response from upload API:", data); //

  return data.imageUrl;
}
