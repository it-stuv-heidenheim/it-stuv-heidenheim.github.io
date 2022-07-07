/* CONFIG SECTION */

const mapping = [
  {
    /* News */
    cardCode: "5x1SqNDI",
    htmlAnchorId: "bachball-2022-news",
  },
  {
    /* Tickets */
    cardCode: "xvuIEuvn",
    htmlAnchorId: "bachball-2022-tickets",
  },
  {
    /* Discounts */
    cardCode: "ZwzIvZdT",
    htmlAnchorId: "bachball-2022-discounts",
  },
  {
    /* Photographer */
    cardCode: "22Oz8NkQ",
    htmlAnchorId: "bachball-2022-photo",
  },
  {
    /* FAQ Section */
    cardCode: "T3dsxBnm",
    htmlAnchorId: "bachball-2022-faq",
  },
];

mapping.forEach((mapObj) => {
  const { cardCode, htmlAnchorId } = mapObj;

  const url = `https://api.trello.com/1/cards/${cardCode}`;

  const fallbackText =
    "There hasn't been added any content yet. Please come back again later!";

  fetch(url).then((res) => {
    res.json().then((cardData) => {
      var htmlAnchor = document.querySelector(`#${htmlAnchorId}`);
      htmlAnchor.innerHTML = processCardDataAndGetText(cardData);
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

function processCardDataAndGetText(cardData) {
  var resHtml = `<h6>${sanitizeHtml(cardData.desc) || fallbackText}</h6>`;
  return resHtml;
}

const faqTemplate = (question, answer) => {
  return `<div><p>${question}</p>
  <br/>
  <p><italic>${answer}</italic></p>
  </div>`;
};

function generateFaqHtml(cardDesc) {
  var lines = cardDesc.split("\n");
  var i = 0;
  var resHtml = "";
  for (i; i < lines.length; i++) {
    var line = lines[i];
    var lineSplit = line.split(":").trim();
    var question = lineSplit[0];
    var answer = lineSplit[1];
    resHtml += faqTemplate(question, answer);
  }
}
