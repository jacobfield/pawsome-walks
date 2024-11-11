import { useState, useEffect } from "react";

export default function useFilterBoxes() {

    useEffect(() => {
        if (currentCard === "All") {
            setCards(allCards);
        } else {
            const filtered = allCards.filter((card)) => {
                return (
                    card.walktype == currentCart || card.walkType.includes(currentCard)
                    || card.offleadareas == currentCard // true or false
                    || card.paths == currentCard // true or false
                    || card.animalsonroute == currentCard // true or false
                    || card.toilets == currentCard // true or false
                    || card.wateronroute == currentCard // true or false
                    || card.scenic == currentCard // true or false
                    || card.parking == currentCard || card.parking.includes(currentCard)
                )
            }
            setCards(filtered);
        }
    }, [currentCard])


}

// Might just need to make the 'value' for each of the boolean options a boolean, and then when the filter checks it will just return the ones with matching truthy values.
// walktype and parking will need to be select options