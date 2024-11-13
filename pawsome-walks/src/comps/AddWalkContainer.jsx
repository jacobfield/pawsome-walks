import { useState } from "react";
import uploadWalkPicture from "../hooks/apiCalls/uploadWalkPicture";
import postWalk from "../hooks/apiCalls/postWalk";
import AddWalkForm from "./AddWalkForm";
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
    if (!selectedFile || walkIdToUpload || walkData) return;
    try {
      const uploadedWalkData = await postWalk(walkData);
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

  return (
    <div className="addWalkContainer">
      <AddWalkForm></AddWalkForm>
    </div>
  );
}
// Collect Walk Data from form, which is yet to be made
// ensure that owner is logged in to display add walk button ///////////// DONE
//walk id to be random number?
