export default function Quote() {
  const quotes = [
    "Discover Pawsome trails for you and your furry friend!",
    "Your go-to site for tail-wagging adventures!",
    "Find the perfect walk to make your dog's day!",
    "Explore unforgettable outings!",
    "Where every step is an adventure for you and your dog!",
    "Walks that both you and your dog will love!",
    "Find the best spots to walk, sniff, and explore !",
    "Your dog's favorite site for outdoor fun!",
    "Creating memories, one walk at a time!",
    "The ultimate guide to exploring the great outdoors with your dog!",
    "The best place to find your new favourite walk!",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <div className="quoteDiv">
      <h1 className="quote fade">&ldquo; {randomQuote} &ldquo;</h1>
      <br></br>
    </div>
  );
}
