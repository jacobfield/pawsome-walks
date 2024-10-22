import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import getWalkById from "../hooks/getWalkById";

export default function WalkDetail() {
  const { walkid } = useParams(); // get walkId from params
  const [walk, setWalk] = useState(null);

  useEffect(() => {
    async function fetchWalk(walkid) {
      const walkData = await getWalkById(walkid);
      setWalk(walkData);
      console.log("WalkDetail.jsx walk data", walkData);
    }
    fetchWalk(walkid);
  }, []);

  return (
    <>
      <p>Walk Detail</p>
      <div className="walkDetail">
        <Link className="noTextDecoration" to="/">
          Back to Walks
        </Link>
        {/* Rest of the walk details */}
      </div>
    </>
  );
}
