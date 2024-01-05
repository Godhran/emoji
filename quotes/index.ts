const quotes = require("./quotes.json");

const filteredQuotes = quotes.filter(
  (quote) => quote.quote.length < 100 && /[A-Za-z0-9 _.,!"']/.test(quote)
);
filteredQuotes.map((item, index) => {
  filteredQuotes[index] = { author:item.author, quote: item.quote.replace(/â€²/g, "'").replace(/â€™/g, "'").replace(/“/g, "").replace(/”/g, "") };
});
console.log(quotes.length, filteredQuotes.length);
console.log(filteredQuotes);

console.log(/^[a-zA-Z\s.,"']+$/.test(filteredQuotes[0].quote));

const fs = require('fs');

fs.writeFile("cleanQuotes.json", JSON.stringify(filteredQuotes), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 

// Or
// fs.writeFileSync('/tmp/test-sync', 'Hey there!');