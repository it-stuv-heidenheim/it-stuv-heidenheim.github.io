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

      const titleLocationPattern =
        /(?<title>\w+[ \d\w]+)(?:\(Ort: *(?<location>[\w \(\)-]+)\)){0,1}/

      const { title, location } = name.match(titleLocationPattern).groups

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

        htmlOut += `<h3 style="margin-bottom: 1em; font-size:2.5em; margin-top:3em">${monthHeading}</h3>`
      }

      var dateFormatted = date
        .toLocaleDateString("de-de", {
          day: "numeric",
          weekday: "short",
          month: "2-digit",
        })
        .toUpperCase()
        .replace(/(\w+)\.,/g, "$1,")
      // just replace the dot, but there would sure be a better way for formatting

      // parse markdown in description
      // first italic, then bold and then links
      // and afterwards, one level of heading

      var parsedDescription = desc
        .replace(/_(\w[\w \.\(\)\/:]*)_/g, "<i>$1</i>")
        .replace(/\*\*(\w[\w \.\(\)\/:]*)\*\*/g, "<strong>$1</strong>")
        .replace(/\[(\w[\w ]*)\]\(([\w-:\.\/]{4,})\)/g, '<a href="$2">$1</a>')
        .replace(/# *(\w[\w ]*)/g, "<h4>$1</h4>")

      htmlOut += `
      <h4 style="color: #E2001A">${dateFormatted}</h4>
      <h3>${title}</h3>
      ${
        location
          ? `<h5><span style="margin-right: 5px">&#128205;</span>${location}</h5>`
          : ""
      }
      <p style="margin-bottom: 3em">${
        parsedDescription || noDescriptionText
      }</p>
      `
    }

    document.querySelector("#" + htmlAnchorId).innerHTML = htmlOut
  })
})
