import { useState } from "react";

export default function AddWalkForm() {
  const [walkData, setWalkData] = useState({});
  const [walkName, setWalkName] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [walkType, setWalkType] = useState([""]);
  const [offLeadAread, setOffLeadArea] = useState(false);
  const [paths, setPaths] = useState(false);
  const [animalsOnRoute, setAnimalsOnRoute] = useState(false);
  const [toilets, setToilets] = useState(false);
  const [waterOnRoute, setWaterOnRoute] = useState(false);
  const [scenic, setScenic] = useState(false);
  const [parking, setParking] = useState(["Paid", "Free"]);

  return <></>;
}
