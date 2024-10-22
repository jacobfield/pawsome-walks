import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function WalkDetail() {
  const { walkid } = useParams(); // get walkId from params
  const [walk, setWalk] = useState(null);
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
