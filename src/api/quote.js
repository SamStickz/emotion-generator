export const fetchQuoteByEmotion = async () => {
  const quotes = [
    {
      content: "Be yourself; everyone else is already taken.",
      author: "Oscar Wilde",
    },
    {
      content:
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      content:
        "Keep going. Everything you need will come to you at the perfect time.",
      author: "Unknown",
    },
    {
      content:
        "Your present circumstances don’t determine where you can go. They merely determine where you start.",
      author: "Nido Qubein",
    },
    {
      content: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      content: "Doubt kills more dreams than failure ever will.",
      author: "Suzy Kassem",
    },
    {
      content: "You are stronger than you think.",
      author: "Unknown",
    },
    {
      content: "Out of difficulties grow miracles.",
      author: "Jean de La Bruyère",
    },
    {
      content:
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      author: "Ralph Waldo Emerson",
    },
    {
      content: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
  ];

  // Randomly return one
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  return random;
};
