import { useState, useContext } from "react";
import uploadWalkPicture from "../hooks/apiCalls/uploadWalkPicture";
import postWalk from "../hooks/apiCalls/postWalk";
import AddWalkForm from "./AddWalkForm";
import { ThemeContext } from "./ThemeProvider";
import { insertUploadRecord } from "../../helper-functions/supabase-helpers/supabaseDbInserter";
//
export default function AddWalkContainer({ allWalks }) {
  const { darkTheme } = useContext(ThemeContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [walkPicture, setWalkPicture] = useState(null);
  const [walkData, setWalkData] = useState({});
  const [walkId, setWalkId] = useState(null);
  //
  const handleWalkPictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAddWalkSubmit = async () => {
    try {
      if (!walkData || !selectedFile) return;
      // 1) post walk data and retrieve
      const newWalk = await postWalk(walkData);
      setWalkId(newWalk.walkId);
      // 2) if file, upload it
      if (selectedFile) {
        const uploadedImage = await uploadWalkPicture(selectedFile, walkId);
        setWalkPicture(uploadedImage);
        setSelectedFile(null);
        // STEP 3: post Uploads with this data
        const uploadRowData = await insertUploadRecord(newWalk);
      }
    } catch (error) {
      console.error("Error adding walk", error);
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
        handleAddWalkSubmit={handleAddWalkSubmit}
      ></AddWalkForm>
    </div>
  );
}

// Collect Walk Data from form, which is yet to be made
// ensure that owner is logged in to display add walk button ///////////// DONE
//walk id to be random number?

// Build out the form
// Potentially build out a new geolocation hook to get lat and lng from location name
