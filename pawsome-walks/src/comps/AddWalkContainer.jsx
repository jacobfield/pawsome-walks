import { useState } from "react";
import uploadWalkPicture from "../hooks/apiCalls/uploadWalkPicture";
export default function AddWalkContainer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [walkPicture, setWalkPicture] = useState(null);
  const handleWalkPictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleUploadWalkPictureClick = async () => {
    if (!selectedFile || walkIdToUpload) return;
    try {
      const uploadedImageUrl = await uploadWalkPicture(
        selectedFile,
        walkIdToUpload
      );
      setWalkPicture(uploadedImageUrl);
      setSelectedFile(null);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return <div className="addWalkContainer"></div>;
}
// ensure that owner is logged in to display add walk button
//walk id to be random number?
