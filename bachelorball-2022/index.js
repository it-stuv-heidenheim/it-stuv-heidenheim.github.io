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

    var htmlContentOfCurrentSection = "";

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
          } else if (htmlContentOfCurrentSection == "") {
            var htmlContent = fallbackText;
          } else {
            var htmlContent = htmlContentOfCurrentSection;
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
          htmlContentOfCurrentSection = "";

          currentHeading = heading;
          isCurrentSectionSupposedToBeHidden =
            line.match(hiddenSectionPattern) != null;
        }
      } else {
        // no heading, so section content is assumed
        // we add the content to handle it later

        htmlContentOfCurrentSection += `<p>${markdownParser(line)}</p>`;
      }
    }

    // when lines done, add last section

    if (isCurrentSectionSupposedToBeHidden) {
      var htmlContent = hiddenText;
    } else if (htmlContentOfCurrentSection == "") {
      var htmlContent = fallbackText;
    } else {
      var htmlContent = markdownParser(htmlContentOfCurrentSection);
    }

    try {
      document.querySelector(
        `#${sectionNodePrefix + currentHeading}`
      ).innerHTML = htmlContent;
    } catch {
      console.warn(`Konnte Anker #${
        sectionNodePrefix + currentHeading
      } nicht finden:
            ${err}`);
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
    .replace(/^# {0,1}(\w.*)/gm, "<h4>$1</h4>")
    .replace(/^## {0,1}(\w.*)/gm, "<h5>$1</h5>")
    .replace(/^### {0,1}(\w.*)/gm, "<h6>$1</h6>")
    .replace(/\*\*([^*]+)\*\*/gm, "<b>$1</b>") // bold text
    .replace(/_([^_]+)_/gm, "<i>$1</i>") // italic text
    .replace(/\[(.+)\]\((.+)\)/gm, '<a href="$2">$1</a>'); // links
  return toHTML.trim(); // using trim method to remove whitespace
};
