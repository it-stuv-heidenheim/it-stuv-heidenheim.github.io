/* CONFIG SECTION */

const cardCode = "UjbESARx";
const htmlAnchorId = "faq-anchor";

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
  if (!cardData.desc) return `<p>${fallbackText}</p>`;

  var resHtml = "";
  var lines = cardData.desc.split("\n");
  for (var lineIdx in lines) {
    var line = lines[lineIdx].trim();

    if (line == "") continue;
    var lineParts = line.split("-");
    if (lineParts.length != 2) continue;

    var question = lineParts[0],
      answer = lineParts[1];

    resHtml += makeFaqElement(question, answer);
  }
  return resHtml;
}

function makeFaqElement(question, answer) {
  return `
	<div>
	<h6>${question}</h6>
	<p>${answer}</p>	
	</div>
	`;
}
