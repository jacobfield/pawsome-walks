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
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [walkType, setWalkType] = useState([""]);
  const [offLeadAreas, setOffLeadAreas] = useState(null);
  const [paths, setPaths] = useState(null);
  const [animalsOnRoute, setAnimalsOnRoute] = useState(null);
  const [toilets, setToilets] = useState(null);
  const [waterOnRoute, setWaterOnRoute] = useState(null);
  const [scenic, setScenic] = useState(null);
  const [parking, setParking] = useState("none");
  const [newWalkType, setNewWalkType] = useState("");
  const { darkTheme } = useContext(ThemeContext);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "walkname":
        setWalkName(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      case "walktype": {
        // from the inputted value, split the string into an array of strings, and then set this as the value of walkType
        let walkTypeInputs = e.target.value.split(" ");
        console.log("walkTypeInputs", walkTypeInputs);
        setWalkType([walkTypeInputs]);
        break;
      }
      case "offleadareas":
        setOffLeadAreas(JSON.parse(e.target.value));
        break;
      case "paths":
        setPaths(JSON.parse(e.target.value));
        break;
      case "animalsonroute":
        setAnimalsOnRoute(JSON.parse(e.target.value));
        break;
      case "toilets":
        setToilets(JSON.parse(e.target.value));
        break;
      case "wateronroute":
        setWaterOnRoute(JSON.parse(e.target.value));
        break;
      case "scenic":
        setScenic(JSON.parse(e.target.value));
        break;
      case "parking":
        setParking(e.target.value);
        break;
      default:
        return;
    }
  };

  const walkTypeArr = [
    ...new Set([...allWalks.flatMap((walk) => walk.walktype), ...walkType]),
  ];

  const handleNewWalkTypeSubmit = (e) => {
    e.preventDefault();
    if (newWalkType.length >= 4 && newWalkType.length <= 15) {
      setWalkType([...walkType, newWalkType]);
      setNewWalkType("");
    }
  };

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
      setLat(null);
      setLng(null);
      setWalkType([]);
      setOffLeadAreas(false);
      setPaths(false);
      setAnimalsOnRoute(false);
      setToilets(false);
      setWaterOnRoute(false);
      setScenic(false);
      setParking("none");
    } catch (error) {
      console.error("Error uploading new walk:", error);
    }
  };

  return (
    <div className="addWalkFormContainer">
      <form onSubmit={handleSubmit} className="addWalkForm">
        <label htmlFor="walkname">{/* Walk name: */}</label>
        <input
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
          type="text"
          id="walkName"
          name="walkname"
          value={walkName}
          onChange={handleChange}
          minLength="5"
          placeholder="Enter walk name..."
          required
        />
        <label htmlFor="location">{/* Location: */}</label>
        <input
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={handleChange}
          minLength="5"
          placeholder="Enter location..."
          required
        />
        <label htmlFor="walktype">{/* Walk Types: */}</label>
        {/* <select
          name="walktype"
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
          id="walktype"
          onChange={handleChange}
          value={walkType[0] || ""}
        >
          <option value="" disabled>
            Select walk type
          </option>
          {walkTypeArr.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select> */}
        <div>
          <label htmlFor="newWalkType">{/* Add New Walk Type: */}</label>
          <input
            type="text"
            className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
            id="walktype"
            value={newWalkType}
            maxLength="30"
            minLength="4"
            onChange={(e) => setNewWalkType(e.target.value)}
            placeholder="Enter walk types..."
          />
          {/* <button
            className={`walkFormButton ${darkTheme ? "dark" : "light"}`}
            type="button"
            onClick={handleNewWalkTypeSubmit}
          >
            Add Walk Type
          </button> */}
        </div>

        <select
          required
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
          name="offleadareas"
          onChange={handleChange}
          id="offleadareas"
          value={offLeadAreas}
        >
          <option disabled selected>
            Off-lead areas?
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          required
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
          name="paths"
          onChange={handleChange}
          id="paths"
          value={paths}
        >
          <option disabled selected>
            Paved routes?
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          required
          name="animalsonroute"
          onChange={handleChange}
          id="animalsonroute"
          value={animalsOnRoute}
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
        >
          <option disabled selected>
            Animals on route?
          </option>

          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          required
          name="toilets"
          onChange={handleChange}
          id="toilets"
          value={toilets}
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
        >
          <option disabled selected>
            Toilets available?
          </option>

          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          required
          name="wateronroute"
          onChange={handleChange}
          id="waterOnRoute"
          value={waterOnRoute}
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
        >
          <option disabled selected>
            Water on route?
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          required
          name="scenic"
          onChange={handleChange}
          id="scenic"
          value={scenic}
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
        >
          <option disabled selected>
            Scenic views?
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          required
          name="parking"
          onChange={handleChange}
          id="parking"
          value={parking}
          className={`walkFormInput ${darkTheme ? "dark" : "light"}`}
        >
          <option disabled selected>
            Is there parking?
          </option>
          <option value="none">No parking</option>
          <option value="free">Free parking</option>
          <option value="paid">Paid parking</option>
        </select>

        <button
          className={`walkFormButton ${darkTheme ? "dark" : "light"}`}
          type="submit"
        >
          Submit for approval
        </button>
      </form>
    </div>
  );
}

// FORMS which need handle functionality: walkname, location, walktype, offleadareas, paths, animalsonroute, toilets, wateronroute, scenic, parking
