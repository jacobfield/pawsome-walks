import { Link } from "react-router-dom";

export default function WalkDetailContents({ walk, walkid }) {
  return (
    <>
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
    </>
  );
}
