/* CONFIG SECTION */

const mapping = [
  {
    trelloCardCode: "T3dsxBnm",
    htmlIdSuffix: "faq",
  },
  {
    trelloCardCode: "5x1SqNDI",
    htmlIdSuffix: "allgemeines",
  },
  {
    trelloCardCode: "j5fFddpq",
    htmlIdSuffix: "location",
  },
  {
    trelloCardCode: "KpMuPESO",
    htmlIdSuffix: "motto",
  },
  {
    trelloCardCode: "xvuIEuvn",
    htmlIdSuffix: "tickets",
  },
  {
    trelloCardCode: "22Oz8NkQ",
    htmlIdSuffix: "fotos",
  },
];

const hiddenText = `Für diesen Bereich stehen noch keine Daten zur Verfügung.
Bitte versuche es später erneut.`;

mapping.forEach((mapObj) => {
  const { trelloCardCode, htmlIdSuffix } = mapObj;

  const url = `https://api.trello.com/1/cards/${trelloCardCode}`;

  const fallbackText =
    "There hasn't been added any content yet. Please come back again later!";

  fetch(url).then((res) => {
    res.json().then((cardData) => {
      var htmlAnchor = document.querySelector(`#bachball-2022-${htmlIdSuffix}`);
      htmlAnchor.innerHTML = processCardDataAndGetText(cardData, fallbackText);
    });
  });
});

/* SECURE MAKING SECTION */

// remove script tags in html code
function removeScriptTags(html) {
  return html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
}

// remove style tags in html code
function removeStyleTags(html) {
  return html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
}

function sanitizeHtml(html) {
  return removeScriptTags(removeStyleTags(html));
}

function processCardDataAndGetText(cardData, fallbackText) {
  if (
    cardData.labels.find((labelObj) => labelObj.color == "red") != undefined
  ) {
    // red label set, so content is not supposed to be published yet
    return `<p>${hiddenText}</p>`;
  }
  var resHtml = `<h6>${sanitizeHtml(cardData.desc) || fallbackText}</h6>`;
  return resHtml;
}

const faqTemplate = (question, answer) => {
  return `<div><h6>${question}</h6>
  <p>${answer}</p>
  </div>`;
};

function generateFaqHtml(cardDesc) {
  var lines = cardDesc.split("\n");
  var i = 0;
  var resHtml = "";
  for (i; i < lines.length; i++) {
    var line = lines[i];
    var lineSplit = line.split("-").trim();
    var question = lineSplit[0];
    var answer = lineSplit[1];
    resHtml += faqTemplate(question, answer);
  }
}
