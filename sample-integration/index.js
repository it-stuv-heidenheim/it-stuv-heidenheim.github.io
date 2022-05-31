/* CONFIG SECTION */

const cardCode = "bUqqHU2g";
const htmlAnchorId = "trello-integration-anchor";

/* LOGIC SECTION */

const url = `https://api.trello.com/1/cards/${cardCode}`;

const fallbackText =
  "There hasn't been added any content yet. Please come back again later!";

fetch(url).then((res) => {
  res.json().then((cardData) => {
    var htmlAnchor = document.querySelector(`#${htmlAnchorId}`);
    htmlAnchor.innerHTML = processCardDataAndGetText(cardData);
  });
});

function processCardDataAndGetText(cardData) {
  var resHtml = `<p>${cardData.desc || fallbackText}</p>`;
  return resHtml;
}
