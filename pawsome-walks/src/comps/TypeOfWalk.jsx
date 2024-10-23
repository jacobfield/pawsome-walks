export default function TypeOfWalk({ walk }) {
  return (
    <div className="onOfferContainer">
      <h4 className="onOfferHeader">Type of walk:</h4>
      <ul className="onOfferList">
        {walk.walktype.map((element) => (
          <li key={element}>{element}</li>
        ))}
      </ul>
    </div>
  );
}
