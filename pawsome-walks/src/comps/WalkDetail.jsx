/* eslint-disable react/prop-types */
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import getWalkById from "../hooks/apiCalls/getWalkById";
import { bouncy } from "ldrs";
import Map from "./google-maps/comps/Map";
import WalkDetailContents from "./WalkDetailContents";

export default function WalkDetail({ favouriteWalks, setFavouriteWalks }) {
  const { walkid } = useParams(); // get walkId from params
  const [walk, setWalk] = useState(null);
  bouncy.register();
  console.log("walkId in WalkDetail", walkid, typeof walkid);

  useEffect(() => {
    async function fetchWalk(walkid) {
      const walkData = await getWalkById(walkid);
      setWalk(walkData);
      // console.log("WalkDetail.jsx walk data", walk);
    }
    fetchWalk(walkid);
  }, [walkid]);

  if (!walk) {
    return (
      <div className="loadingContainer">
        <l-bouncy size="45" speed="1.75" color="#64abc1"></l-bouncy>
      </div>
    );
  }
  console.log("walk", walk);
  if (walk) {
    return (
      <div className="walkDetailContainer">
        <div className="mapContainer">
          <Map
            latitude={walk.lat}
            longitude={walk.lng}
            success={walk.lat && walk.lng ? true : false}
            walkName={walk.walkname}
            walkLocation={walk.location}
            walkType={walk.walktype}
          ></Map>
        </div>
        <div className="walkDetailImgContainer"></div>
        <WalkDetailContents
          walk={walk}
          walkidString={walkid}
          favouriteWalks={favouriteWalks}
          setFavouriteWalks={setFavouriteWalks}
          approved={walk.approved}
        ></WalkDetailContents>
      </div>
    );
  }
}
