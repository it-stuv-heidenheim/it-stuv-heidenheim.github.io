/* CONFIG SECTION */

const apiToken = "0TNxIxk3ETO9T2BfMZ9S821C";
const trelloBoardId = "61e0727e01aa1e19ecb7adbf";

const htmlAnchorId = "trello-calendar";

/* LOGIC SECTION */

const url = `https://api.trello.com/1/boards/${trelloBoardId}/cards?token=${apiToken}`;

const fallbackText =
  "There hasn't been added any content yet. Please come back again later!";

var htmlOut = "";

fetch(url).then((res) => {
  res.json().then((cards) => {
    // first, sort the card by their due date

    cards.sort((a, b) => a.due - b.due);

    var iterMonthCode = "";

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];

      const { name, desc, due, labels } = card;

      if (labels.length > 0) continue;

      if (due == null) continue;

      // just very basic reformatting

      var date = new Date(due);

      // TODO pretty display

      if (iterMonthCode != date.getMonth() + date.getFullYear()) {
        iterMonthCode = date.getMonth() + "-" + date.getFullYear();

        var monthHeading = date.toLocaleDateString("de-de", {
          month: "long",
        });

        htmlOut += `<br><h2>${monthHeading}</h2>`;
      }

      var dateFormatted = date.toLocaleDateString("de-de", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });

      htmlOut += `<div><i>${dateFormatted}</i></div><h3>${name}</h3><p>${desc}</p>`;
    }

    document.querySelector("#" + htmlAnchorId).innerHTML = htmlOut;
  });
});
