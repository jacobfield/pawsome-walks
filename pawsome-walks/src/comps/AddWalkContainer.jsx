import { useState, useContext } from "react";
import uploadWalkPicture from "../hooks/apiCalls/uploadWalkPicture";
import postWalk from "../hooks/apiCalls/postWalk";
import AddWalkForm from "./AddWalkForm";
import { ThemeContext } from "./ThemeProvider";
export default function AddWalkContainer({ allWalks }) {
  const { darkTheme } = useContext(ThemeContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [walkPicture, setWalkPicture] = useState(null);
  const [walkData, setWalkData] = useState({});
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
    <div className={`addWalkContainer ${darkTheme ? "dark" : "light"}`}>
      <AddWalkForm
        handleWalkPictureChange={handleWalkPictureChange}
        handleUploadWalkPictureClick={handleUploadWalkPictureClick}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        walkPicture={walkPicture}
        setWalkPicture={setWalkPicture}
        allWalks={allWalks}
      ></AddWalkForm>
    </div>
  );
}

// Collect Walk Data from form, which is yet to be made
// ensure that owner is logged in to display add walk button ///////////// DONE
//walk id to be random number?

// Build out the form
// Potentially build out a new geolocation hook to get lat and lng from location name
