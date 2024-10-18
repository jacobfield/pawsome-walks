import { useState } from "react";

export default function Main({ allWalks }) {
  const [walks, setWalks] = useState(
    Array.from({ length: 30 }, (_, i) => i + 1)
  );
  //setWalks
  return (
    <section className="walksContainer">
      {allWalks &&
        allWalks.map((walk) => (
          <div key={walk.walkid} className="walk">
            <h2>{walk.walkname}</h2>
            <img
              className="walkPreviewImg"
              src={`walk-photos/${walk.photopath}.jpg`}
              alt={walk.walkname}
            />
          </div>
        ))}
      {/* ))}
      {walks.map((walk) => (
        <div key={walk} className="walk"></div>
      ))} */}
    </section>
  );
}
