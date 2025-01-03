import { useState, useContext } from "react";
import uploadWalkPicture from "../hooks/apiCalls/uploadWalkPicture";
import postWalk from "../hooks/apiCalls/postWalk";
import AddWalkForm from "./AddWalkForm";
import { ThemeContext } from "./ThemeProvider";

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
    if (!file) {
      alert("A picture of the walk is required to add a new one!");
    }
  };

  const handleAddWalkSubmit = async (walkData) => {
    try {
      if (!walkData || !selectedFile) return;
      // 1) post walk data and retrieve
      console.log("AddWalkContainer.jsx: walkData", walkData);
      const newWalk = await postWalk(walkData);
      setWalkId(newWalk.data.walkid);
      // 2) if file, upload it
      console.log("AddWalkContainer.jsx: walkid", newWalk.data.walkid);
      if (selectedFile) {
        const uploadedImage = await uploadWalkPicture(
          selectedFile,
          newWalk.data.walkid
        );
        setWalkPicture(uploadedImage);
        setSelectedFile(null);
        // STEP 3: post Uploads with this data
        // const uploadRowData = await insertUploadRecord(newWalk);
      }
    } catch (error) {
      console.error("Error adding walk (AddWalkContainer.js", error);
    }
  };
  return (
    <div className={`addWalkContainer ${darkTheme ? "dark" : "light"}`}>
      <AddWalkForm
        handleWalkPictureChange={handleWalkPictureChange}
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
