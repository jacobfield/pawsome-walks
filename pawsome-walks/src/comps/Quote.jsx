export default function Quote() {
  const quotes = [
    "Discover the most pawsome trails for you and your furry friend!",
    "Your go-to site for tail-wagging adventures!",
    "Find the perfect walk to make your dog's day!",
    "Explore scenic routes for unforgettable dog-friendly outings!",
    "Pawsome Walks: Where every step is an adventure for you and your dog!",
    "Unleash happiness with walks that both you and your dog will love!",
    "Find the best spots to walk, sniff, and explore with your canine companion!",
    "Your dog's new favorite site for outdoor fun!",
    "Pawsome Walks: Creating memories, one walk at a time!",
    "The ultimate guide to exploring the great outdoors with your dog!",
    "The best place to find your new favourite walk!",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <div className="quoteDiv">
      <h1 className="quote">&ldquo; {randomQuote} &ldquo;</h1>
      <br></br>
    </div>
  );
}
