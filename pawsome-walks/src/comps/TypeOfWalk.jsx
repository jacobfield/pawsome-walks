export default function TypeOfWalk({ walk }) {
  return (
    <div className="onOfferContainer">
      <h3 className="onOfferHeader">Type of walk:</h3>
      <ul className="onOfferList">
        {walk.walktype.map((element) => (
          <li key={element}>{element}</li>
        ))}
      </ul>
    </div>
  );
}
