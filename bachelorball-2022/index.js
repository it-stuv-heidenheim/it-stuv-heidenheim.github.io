/* CONFIG SECTION */

const trelloCardCode = "ER1gWlYv";

// Text to be shown if label is hidden
const hiddenText = `Dieser Bereich wurde noch nicht veröffentlicht, bitte
versuche es in wenigen Tagen nochmal!`;

// Text to be shown if label is hidden but no description set
const noContentYetText = hiddenText;

const url = `https://api.trello.com/1/cards/${trelloCardCode}`;

const fallbackText = `Für diesen Bereich stehen noch keine Daten zur Verfügung.
Bitte versuche es später erneut.`;

const sectionNodePrefix = "bachball_2022_";

fetch(url).then((res) => {
  res.json().then((cardData) => {
    if (!cardData.desc) {
      alert(`Kritischer Fehler: 
      überhaupt keine Daten gefunden, bitte sei so gut und melde das dem Orga-Team`);
    }
    var lines = cardData.desc.split("\n");

    var sectionHeadingPattern = RegExp(`^\/\/\/ *(?<sectionName>\\w+) *`);

    var hiddenSectionPattern = RegExp(`^\/\/\/ *(?<sectionName>\\w+) *#+$`);

    var contentOfCurrentSection = "";

    var currentHeading = "";
    var isCurrentSectionSupposedToBeHidden = false;

    var firstHeadingHandled = false;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();

      if (line == "") continue;

      if (line.match(sectionHeadingPattern)) {
        var heading = line
          .match(sectionHeadingPattern)
          .groups.sectionName.toLowerCase();

        if (currentHeading == "" && !firstHeadingHandled) {
          // in case we're currently detecting the first heading
          firstHeadingHandled = true;
          currentHeading = heading;
        }

        if (heading != currentHeading) {
          // new heading, so content of old section is complete, we can handle it

          if (isCurrentSectionSupposedToBeHidden) {
            var htmlContent = hiddenText;
          } else if (contentOfCurrentSection == "") {
            var htmlContent = fallbackText;
          } else {
            var htmlContent = markdownParser(contentOfCurrentSection);
          }

          try {
            document.querySelector(
              `#${sectionNodePrefix + currentHeading}`
            ).innerHTML = htmlContent;
          } catch (err) {
            console.warn(`Konnte Anker #${
              sectionNodePrefix + currentHeading
            } nicht finden:
            ${err}`);
          }

          // and empty the content again
          contentOfCurrentSection = "";

          currentHeading = heading;
          isCurrentSectionSupposedToBeHidden =
            line.match(hiddenSectionPattern) != null;
        }
      } else {
        // no heading, so section content is assumed
        // we add the content to handle it later

        contentOfCurrentSection += line;
      }
    }

    // when lines done, add last section

    if (isCurrentSectionSupposedToBeHidden) {
      var htmlContent = hiddenText;
    } else if (contentOfCurrentSection == "") {
      var htmlContent = fallbackText;
    } else {
      var htmlContent = markdownParser(contentOfCurrentSection);
    }

    try {
      document.querySelector(
        `#${sectionNodePrefix + currentHeading}`
      ).innerHTML = htmlContent;
    } catch {
      debugger;
    }
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

const markdownParser = (text) => {
  const toHTML = text
    .replace(/^### (.*$)/gim, "<h3>$1</h3>") // h3 tag
    .replace(/^## (.*$)/gim, "<h2>$1</h2>") // h2 tag
    .replace(/^# (.*$)/gim, "<h1>$1</h1>") // h1 tag
    .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>") // bold text
    .replace(/\*(.*)\*/gim, "<i>$1</i>"); // italic text
  return toHTML.trim(); // using trim method to remove whitespace
};
