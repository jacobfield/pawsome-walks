// src/utils/filterWalks.js

export default function filterWalks(allWalks, searchValue) {
  const lowerSearch = searchValue.toLowerCase();

  return allWalks.filter((walk) => {
    const hasKeywordMatch =
      (lowerSearch.includes("toi") && walk.toilets) ||
      (lowerSearch.includes("par") && walk.parking === "paid") || // adjust this based on parking criteria
      (lowerSearch.includes("ani") && walk.animalsonroute) ||
      (lowerSearch.includes("off") && walk.offleadareas) ||
      (lowerSearch.includes("wat") && walk.wateronroute);

    return (
      hasKeywordMatch ||
      walk.walkname.toLowerCase().includes(lowerSearch) ||
      walk.location.toLowerCase().includes(lowerSearch) ||
      walk.walktype.some((type) => type.toLowerCase().includes(lowerSearch)) ||
      walk.parking.toLowerCase().includes(lowerSearch)
    );
  });
}
