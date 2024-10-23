export default function OnWalkElements({ walk }) {
  const onWalkArray = [
    [walk.offleadareas, "Off-lead areas"],
    [walk.paths, "Pathed routes"],
    [walk.animalsonroute, "Animals on route"],
    [walk.toilets, "Toilets available"],
    [walk.wateronroute, "Water on route"],
    [walk.scenic, "Scenic views"],
  ];

  const filteredWalkElements = onWalkArray
    .filter((item) => item[0] === true)
    .map((item) => item[1]);

  return (
    <div className="onOfferContainer">
      <h3 className="onOfferHeader">What's on offer:</h3>
      <ul className="onOfferList">
        {filteredWalkElements.map((element) => (
          <li key={element}>{element}</li>
        ))}
        <li>{walk.parking === "free" ? "Free parking" : "Paid parking"}</li>
      </ul>
    </div>
  );
}
