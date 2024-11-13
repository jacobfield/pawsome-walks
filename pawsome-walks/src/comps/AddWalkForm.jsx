import { useState, useContext } from "react";
import postWalk from "../hooks/apiCalls/postWalk";
import { ThemeContext } from "./ThemeProvider";
export default function AddWalkForm({
  handleWalkPictureChange,
  handleUploadWalkPictureClick,
  selectedFile,
  setSelectedFile,
  walkPicture,
  setWalkPicture,
  handelSubmit,
  allWalks,
}) {
  const [walkData, setWalkData] = useState({});
  const [walkName, setWalkName] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [walkType, setWalkType] = useState([""]);
  const [offLeadAreas, setOffLeadAreas] = useState(false);
  const [paths, setPaths] = useState(false);
  const [animalsOnRoute, setAnimalsOnRoute] = useState(false);
  const [toilets, setToilets] = useState(false);
  const [waterOnRoute, setWaterOnRoute] = useState(false);
  const [scenic, setScenic] = useState(false);
  const [parking, setParking] = useState("");

  const { darkTheme } = useContext(ThemeContext);
  const handleChange = (e) => {
    switch (e.target.name) {
      case "walkname":
        setWalkName(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      case "walktype":
        setWalkType(e.target.value);
        break;
      case "offleadareas":
        setOffLeadAreas(e.target.value);
        break;
      case "paths":
        setPaths(e.target.value);
        break;
      case "animalsonroute":
        setAnimalsOnRoute(e.target.value);
        break;
      case "toilets":
        setToilets(e.target.value);
        break;
      case "wateronroute":
        setWaterOnRoute(e.target.value);
        break;
      case "scenic":
        setScenic(e.target.value);
        break;
      case "parking":
        setParking(e.target.value);
        break;
      default:
        return;
    }
  };
  const walkTypeArr = [...new Set(allWalks.flatMap((walk) => walk.walktype))];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const walkFormData = {
        walkname: walkName,
        location: location,
        lat: lat,
        lng: lng,
        walktype: walkType,
        offleadareas: offLeadAreas,
        paths: paths,
        animalsonroute: animalsOnRoute,
        toilets: toilets,
        wateronroute: waterOnRoute,
        scenic: scenic,
        parking: parking,
      };

      await postWalk(walkFormData);

      setWalkName("");
      setLocation("");
      setLat();
      setLng();
      setWalkType([""]);
      setOffLeadAreas(false);
      setPaths(false);
      setAnimalsOnRoute(false);
      setToilets(false);
      setScenic(false);
      setWaterOnRoute(false);
      setParking(["Paid", "Free"]);
    } catch (error) {
      console.error(
        "Error uploading new walk (AddWalkForm.jsx Handle Submit):",
        error
      );
    }
    return (
      <div className="addWalkFormContainer">
        <form onSubmit={handleSubmit} className="addWalkForm">
          <label htmlFor="walkname">Walk Name:</label>
          <input
            className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
            type="text"
            id="walkName"
            name="walkName"
            value={walkName}
            onChange={handleChange}
          />
          <label htmlFor="location">Location:</label>
          <input
            className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={handleChange}
          />
          <label htmlFor="walktype">Walk Type:</label>
          <input
            className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
            type="text"
            id="walktype"
            name="walktype"
            value={walkType}
            onChange={handleChange}
          />
          <select onChange={handleChange} id="walktype">
            {walkTypeArr.map((walktype) => (
              <option key={walktype} value={walktype}>
                {walktype}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            id="offleadareas"
            value={offLeadAreas}
          >
            <option value="true">Off lead areas</option>
            <option value="false">No off lead areas</option>
          </select>
          <select onChange={handleChange} id="paths" value={paths}>
            <option value="true">Paved routes</option>
            <option value="false">No paved routes</option>
          </select>
          <select
            onChange={handleChange}
            id="animalsonroute"
            value={animalsOnRoute}
          >
            <option value="true">Animals on route</option>
            <option value="false">No animals on route</option>
          </select>
          <select onChange={handleChange} id="toilets" value={toilets}>
            <option value="true">Toilets available</option>
            <option value="false">No toilets available</option>
          </select>
          <select
            onChange={handleChange}
            id="waterOnRoute"
            value={waterOnRoute}
          >
            <option value="true">Water on route</option>
            <option value="false">No water on route</option>
          </select>
          <select onChange={handleChange} id="scenic" value={scenic}>
            <option value="true">Scenic Views</option>
            <option value="false">No scenic views</option>
          </select>
          <select onChange={handleChange} id="parking" value={parking}>
            <option value="free">Free parking</option>
            <option value="paid">Paid parking</option>
            <option value="none">No parking</option>
          </select>
          <button className="submitButton" type="submit">
            Submit for approval
          </button>
        </form>
      </div>
    );
  };
}

// FORMS which need handle functionality: walkname, location, walktype, offleadareas, paths, animalsonroute, toilets, wateronroute, scenic, parking
