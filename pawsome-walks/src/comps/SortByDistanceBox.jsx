export default function SortByDistanceBox({ sortProps }) {
  const { isSorted, setIsSorted } = sortProps;

  const handleChange = () => {
    setIsSorted(!isSorted);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          id="sortByDistance"
          value="true"
          onChange={handleChange}
          checked={isSorted} 
        />
        Sort By Distance
      </label>
    </div>
  );
}
