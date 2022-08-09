/* for each sport, there is a card where the responsible people (Sport-Referat) type their information in
so we have a list of cards and of course a list of corresponding card codes which can be used to get
the contents via the Trello API
Then, each content will be displayed in a div which will (on production site) be styled by elementor.
But there's always a inner div where the text stands in. And we just need the id of that div.
Each div will get the contents of a card corresponding to one sport.
*/

const refData = [
  {
    name: "Aktuelles",
    cardCode: "QIQciu9Y",
  },
  {
    name: "Hochschulsport",
    cardCode: "L5goybS3",
  },
  {
    name: "Fitness",
    cardCode: "tM5tQewa",
  },
  {
    name: "Zumba",
    cardCode: "NmhFKHz4",
  },
  {
    name: "Yoga",
    cardCode: "keLc9SX1",
  },
  {
    name: "Pilates",
    cardCode: "7ooQ3Xyw",
  },
  {
    name: "Tennis",
    cardCode: "eq4nXD9N",
  },
  {
    name: "Bootsführerschein",
    cardCode: "FjMCfJ74",
  },
];

const baseURI = "https://api.trello.com/1/cards/";

var htmlNode = document.querySelector("#trello-sport-anchor");

/* iterate over all the cards and just fill their contents with the descriptions */

/* this one could also have been solved way more elegant, but this is more intuitive,
especially for beginners who aren't that familiar with promises
*/
refData.forEach((section) => {
  fetch(baseURI + section.cardCode)
    .then((res) => {
      res.json().then((data) => {
        if (!data.desc) {
          htmlNode.innerHTML += `
          <h3>${section.name}</h3>
          <p>Für diesen Bereich stehen aktuell keine Daten zur Verfügung</p>
          `;
        } else {
          htmlNode.innerHTML += `
          <h3>${section.name}</h3>
          <div>${parseMarkdown(data.desc)}</div>
          `;
        }
      });
    })
    .catch((err) => console.warn("Fetch failure: \n\n" + err));
});

/* to make easy formatting possible, we support MarkDown Syntax. Below implemented is a very limited parser */
function parseMarkdown(markdownText) {
  return (
    markdownText
      .replace(/^# (.*$)/gim, "<h3>$1</h3>") // the headings, start from h3 since h1 and h2 are already set in static page
      .replace(/^## (.*$)/gim, "<h4>$1</h4>")
      .replace(/^### (.*$)/gim, "<h5>$1</h5>")
      .replace(/^#### (.*$)/gim, "<h6>$1</h6>")
      .replace(/^##### (.*$)/gim, "<strong>$1</strong>")
      .replace(/^###### (.*$)/gim, "<p>$1</p>")
      /* .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />") */ // we don't need that yet
      .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>") // bold and italic
      .replace(/\_(.*)\_/gim, "<i>$1</i>")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
      .replace(/\n$/gim, "<br />")
      .trim()
  );

  // ref: https://www.bigomega.dev/markdown-parser
}
