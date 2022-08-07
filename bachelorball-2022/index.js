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

// Text to be shown if label is hidden
const hiddenText = `Für diesen Bereich stehen noch keine Daten zur Verfügung.
Bitte versuche es später erneut.`;

// Text to be shown if label is hidden but no description set
const noContentYetText = hiddenText;

mapping.forEach((mapObj) => {
  const { trelloCardCode, htmlIdSuffix } = mapObj;

  const url = `https://api.trello.com/1/cards/${trelloCardCode}`;

  const fallbackText =
    "There hasn't been added any content yet. Please come back again later!";

  fetch(url).then((res) => {
    res.json().then((cardData) => {
      var htmlAnchor = document.querySelector(`#bachball-2022-${htmlIdSuffix}`);

      var innerHtml = "";
      if (
        cardData.labels.find((labelObj) => labelObj.color == "red") != undefined
      ) {
        // red label set, so content is not supposed to be published yet
        innerHtml = `<p>${hiddenText}</p>`;
      } else {
        // act normal and process card description
        innerHtml = processSwitchAndReturnHtml(htmlIdSuffix, cardData.desc);
      }

      htmlAnchor.innerHTML = innerHtml;
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

/* END OF SECURE MAKING */

function processSwitchAndReturnHtml(htmlSuffix, cardDesc) {
  switch (htmlSuffix) {
    case "faq":
      return generateFaqHtml(cardDesc);
    default:
      return processCardDataAndGetText(cardDesc);
  }
}

function processCardDataAndGetText(cardDesc) {
  return `<h6>${sanitizeHtml(cardDesc) || noContentYetText}</h6>`;
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
    if (line == "") continue;
    var lineParts = line.split("-");

    // if no - in there, no answer set yet, skip the line
    if (lineParts.length < 2) continue;

    var question = lineParts[0].trim();
    var answer = lineParts[1].trim();
    resHtml += faqTemplate(question, answer);
  }

  return resHtml;
}
