// src/utils/filterWalks.js

export default function filterWalks(allWalks, searchValue) {
    const lowerSearch = searchValue.toLowerCase();
  
    return allWalks.filter((walk) => {
      return (
        walk.walkname.toLowerCase().includes(lowerSearch) ||
        walk.location.toLowerCase().includes(lowerSearch) ||
        walk.walktype.some((type) => type.toLowerCase().includes(lowerSearch)) ||
        walk.parking.toLowerCase().includes(lowerSearch) ||
        (walk.animalsonroute ? 'yes' : 'no').includes(lowerSearch) ||
        (walk.offleadareas ? 'yes' : 'no').includes(lowerSearch) ||
        (walk.toilets ? 'yes' : 'no').includes(lowerSearch) ||
        (walk.wateronroute ? 'yes' : 'no').includes(lowerSearch)
      );
    });
  }
  