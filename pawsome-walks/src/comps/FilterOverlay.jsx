import FilterBoxes from "./FilterBoxes";

export default function FilterOverlay({
  filterIsOpen,
  setFilterIsOpen,
  setIsFiltered,
  allWalks,
  setFilteredWalks,
  filteredWalks,
}) {
  const handleChange = () => {
    setFilterIsOpen(!filterIsOpen);
  };

  return (
    <>
      <button onClick={handleChange}>FILTERS</button>

      <div className={`filterSlide ${filterIsOpen ? "open" : ""}`}>
        <FilterBoxes
          handleChange={handleChange}
          setIsFiltered={setIsFiltered}
          allWalks={allWalks}
          setFilteredWalks={setFilteredWalks}
          filteredWalks={filteredWalks}
          filterIsOpen={filterIsOpen}
        />
      </div>
    </>
  );
}
