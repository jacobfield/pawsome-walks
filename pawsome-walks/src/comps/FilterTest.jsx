import "./styles.css";
import { useEffect, useState } from "react";

const allCards = [
  {
    title: "VICTORY FOLIO",
    category: ["WEB APP", "FEATURED"],
    description: "Lorem ipsum dolro sit amt, consestcuer elit",
    id: 1
  },
  {
    title: "IN WHOLENESS PRACTICE",
    category: "WEB APP",
    description: "Lorem ipsum dolro sit amt, consestcuer elit",
    id: 2
  },
  {
    title: "TRIBE HAIRCARE",
    category: ["WEB APP", "MOBILE APP", "FEATURED"],
    description: "Lorem ipsum dolro sit amt, consestcuer elit",
    id: 3
  },
  {
    title: "TRIBE SKINCARE",
    category: ["WEB APP", "MOBILE APP"],
    description: "Lorem ipsum dolro sit amt, consestcuer elit",
    id: 4
  },
  {
    title: "BUG TRACKER",
    category: "WEB APP",
    description: "Lorem ipsum dolro sit amt, consestcuer elit",
    id: 5
  },
  {
    title: "PATIENT PORTAL",
    category: "MOBILE APP",
    description: "Lorem ipsum dolro sit amt, consestcuer elit",
    id: 6
  }
];

export default function App() {
  const [cards, setCards] = useState(allCards);
  const [currentCard, setCurrentCard] = useState("All");

  const handleBtns = (e) => {
    let word = e.target.value;
    setCurrentCard(word);
  };

  useEffect(() => {
    if (currentCard === "All") {
      setCards(allCards);
    } else {
      const filtered = allCards.filter((card) => {
        // you have categories as strings and array of strings
        return (
          card.category === currentCard || card.category.includes(currentCard)
        );
      });
      setCards(filtered);
    }
  }, [currentCard]);

  return (
    <div className="App">
      <div id="projectHash">
        <section>
          <h3>PROJECTS</h3>
        </section>

        <section>
          <button onClick={handleBtns} type="button" value="All">
            VIEW ALL
          </button>
          <button onClick={handleBtns} type="button" value="FEATURED">
            FEATURED
          </button>
          <button onClick={handleBtns} type="button" value="WEB APP">
            WEB APP
          </button>
          <button onClick={handleBtns} type="button" value="MOBILE APP">
            MOBILE APP
          </button>
        </section>

        <h3>Current: {currentCard}</h3>

        <section>
          {cards.map((card) => (
            <div key={card.id}>
              <h4>Project Name: {card.title} </h4>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
