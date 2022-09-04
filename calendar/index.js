/* CONFIG SECTION */

const apiToken = "0TNxIxk3ETO9T2BfMZ9S821C"
const trelloBoardId = "61e0727e01aa1e19ecb7adbf"

const htmlAnchorId = "trello-calendar"
const fallbackText =
  "There hasn't been added any content yet. Please come back again later!"

const noDescriptionText = ""
const skipUntilThisMonth = true

/* END OF CONFIG SECTION */

const url = `https://api.trello.com/1/boards/${trelloBoardId}/cards?token=${apiToken}`

var htmlOut = ""

var now = new Date()
var thisMonth = now.getMonth(),
  thisYear = now.getFullYear()

fetch(url).then((res) => {
  res.json().then((cards) => {
    // filter the ones without start date
    cards = cards.filter((card) => card.start != null)

    // sort the cards by their start date (comparison with plain hyphen unfortunately didn't work)
    cards.sort((a, b) => new Date(a.start) - new Date(b.start))

    var iterMonthCode = ""

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i]

      const { name, desc, start, labels } = card

      if (labels.length > 0) continue

      // just very basic reformatting

      var date = new Date(start)

      var monthOfCard = date.getMonth(),
        yearOfCard = date.getFullYear()

      // skip this card if event in past and accordingly configured before

      if (skipUntilThisMonth) {
        if (!(yearOfCard >= thisYear && monthOfCard >= thisMonth)) {
          continue
        }
      }

      // TODO pretty display

      if (iterMonthCode != `${monthOfCard}-${yearOfCard}`) {
        iterMonthCode = `${monthOfCard}-${yearOfCard}`

        var monthHeading = date.toLocaleDateString("de-de", {
          month: "long",
        })

        htmlOut += `<h3 style="margin-bottom: 1em">${monthHeading}</h3>`
      }

      var dateFormatted = date
        .toLocaleDateString("de-de", {
          day: "numeric",
          weekday: "short",
        })
        .toUpperCase()
        .replace(/(\w+)\., (\d+)\./g, "$1 $2")

      htmlOut += `
      <h4 style="color: #E2001A">${dateFormatted}</h4>
      <h3>${name}</h3>
      <p style="margin-bottom: 3em">${desc || noDescriptionText}</p>
      `
    }

    document.querySelector("#" + htmlAnchorId).innerHTML = htmlOut
  })
})
