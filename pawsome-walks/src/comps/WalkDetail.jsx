import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import getWalkById from "../hooks/getWalkById";
import { bouncy } from "ldrs";

export default function WalkDetail() {
  const { walkid } = useParams(); // get walkId from params
  const [walk, setWalk] = useState(null);
  bouncy.register();

  useEffect(() => {
    async function fetchWalk(walkid) {
      const walkData = await getWalkById(walkid);
      setWalk(walkData);
      console.log("WalkDetail.jsx walk data", walk);
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
  return (
    <div className="walkDetailContainer">
      <div className="walkDetailImgContainer"></div>
      <img
        className="walkDetailImg"
        src={`/walk-photos/walk${walkid}.jpg`}
        alt={walk.walkname}
      />

      <div className="walkDetail">
        <Link className="noTextDecoration" to="/">
          Back to Walks
        </Link>
      </div>
    </div>
  );
}
