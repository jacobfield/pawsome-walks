export default function useSortByDistance() {}

// will need sortedWalks state + setter. Will use call to get distance, or some alternate version more suited for this use case
// sortedWalks will each need a new KVP adding; distance from user, which will be added in the custom sort function.
// Then, the sortedWalks will be sorted by distance, and the state will be updated with the new sortedWalks array

// In filterboxes.jsx, the will be a trigger props, passed down from MainCOntent.jsx, which activates the sorting filter:
// if sorted = true, Main will display the sortedWalks array, otherwise, it will display the filteredWalks array

// might be worth calculating the distance and altering the state in a highter level component, then passing it down that way. Then, if the box is checked, alter the management state, which renders it in Main.jsx
// this way, the state is only altered when the box is checked, and the distance is only calculated at a higher component; it might make it a lot easier to manage the state, if the only state being mutated is the toggle feature
