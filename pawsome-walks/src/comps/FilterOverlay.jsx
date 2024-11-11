import FilterBoxes from "./FilterBoxes";

export default function FilterOverlay({
  filterIsOpen,
  setFilterIsOpen,
  setIsFiltered,
  allWalks,
  setFilteredWalks,
  filteredWalks,
}) {
  const handleChange = (e) => {
    setFilterIsOpen(!filterIsOpen);
  };

  return filterIsOpen ? (
    <FilterBoxes
      handleChange={handleChange}
      setIsFiltered={setIsFiltered}
      allWalks={allWalks}
      setFilteredWalks={setFilteredWalks}
      filteredWalks={filteredWalks}
    ></FilterBoxes>
  ) : (
    <>
      <br></br>
      <button onClick={handleChange}>FILTERS</button>
    </>
  );
}
