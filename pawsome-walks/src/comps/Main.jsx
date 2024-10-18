import { useState } from "react";

export default function Main() {
  const [walks, setWalks] = useState(
    Array.from({ length: 30 }, (_, i) => i + 1)
  );
  //setWalks
  return (
    <section className="walksContainer">
      {walks.map((walk) => (
        <div key={walk} className="walk"></div>
      ))}
    </section>
  );
}
