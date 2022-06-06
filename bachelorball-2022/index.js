/* CONFIG SECTION */

const mapping = [
  {
    /* FAQ Section */
    cardCode: "T3dsxBnm",
    htmlAnchorId: "bachball-2022-faq",
  },
  {
    /* News */
    cardCode: "5x1SqNDI",
    htmlAnchorId: "bachball-2022-news",
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
