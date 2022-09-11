const cardData = [
  {
    htmlNodeId: "trello-sitzung-agenda",
    cardCode: "EbMydTLn",
    noContentHtmlFallback: `<h4>Agenda noch nicht veröffentlicht</h4><p>Die Agenda wird meistens wenige Tage vor der Sitzung 
          von den Studierendensprechern basierend auf Vorschlägen der Studierenden aufgestellt und dann auch hier angezeigt.</p>`,
    contentHiddenHtmlFallback: "",
  },
  {
    htmlNodeId: "trello-sitzung-link",
    cardCode: "kgU2MX33",
    noMarkdownButLinkLabel: "Direkt zur StuV Sitzung",
    noContentHtmlFallback: `<h4>Link noch nicht freigegeben</h4><p>Der Link zur Sitzung ist noch nicht freigegeben. Schaut einfach eine knappe Stunde vor der 
      Sitzung hier rein, dann spätestens schalten wir den eigentlich immer frei</p>`,
    contentHiddenHtmlFallback: "",
  },
]

const baseUrl = "https://api.trello.com/1/cards/"

var agendaCard = cardData[0]

fetch(baseUrl + agendaCard.cardCode)
  .then((res) => {
    res.json().then((cardObj) => {
      var htmlOutAgenda = ""

      var text = cardObj.desc.trim()

      var redLabelSet =
          cardObj.labels.find((labelObj) => {
            var cardIsSetHidden = labelObj.color == "red"
            return cardIsSetHidden

            /* when a card with red label is found, here will be returned true */
          }) != undefined,
        isLabelSupposedToBeHidden = redLabelSet
      /* so, if the red label is set, the output is supposed to be hidden on the final page */

      if (isLabelSupposedToBeHidden) {
        htmlOutAgenda =
          cardObj.contentHiddenHtmlFallback || cardObj.noContentHtmlFallback
        /* if the data is supposed to be hidden, show the contentHiddenHtmlFallback */
        /* if that field is empty as well, take the noContentHtmlFallback instead */
      } else if (text == "") {
        /* if text is empty, take the fallback for no content */
        htmlOutAgenda += cardObj.noContentHtmlFallback
      } else {
        htmlOutAgenda += parseMarkdown(text)
      }

      var domNode = document.querySelector("#" + agendaCard.htmlNodeId)

      domNode.innerHTML = htmlOutAgenda
    })
  })
  .catch((err) => console.warn("Fetch failure at agenda card: \n\n" + err))

/* and most of the above logic again for the link card */
/* could have been solved in a loop as well, but this is better code since more readable */
var linkCard = cardData[1]
fetch(baseUrl + linkCard.cardCode)
  .then((res) => {
    res.json().then((cardObj) => {
      var htmlOutLink = ""

      var text = cardObj.desc.trim()

      var redLabelSet =
          cardObj.labels.find((labelObj) => {
            var cardIsSetHidden = labelObj.color == "red"
            return cardIsSetHidden

            /* when a card with red label is found, here will be returned true */
          }) != undefined,
        isLabelSupposedToBeHidden = redLabelSet
      /* so, if the red label is set, the output is supposed to be hidden on the final page */

      if (isLabelSupposedToBeHidden) {
        htmlOutLink =
          linkCard.contentHiddenHtmlFallback || linkCard.noContentHtmlFallback
        // if no fallback for hidden content specified, just take the fallback for no content specified
      } else if (text == "") {
        htmlOutLink = linkCard.noContentHtmlFallback
      } else {
        var linkLabel = linkCard.noMarkdownButLinkLabel

        htmlOutLink = getFormattedButtonFromData(text, linkLabel)
      }

      var domNode = document.querySelector("#" + linkCard.htmlNodeId)

      domNode.innerHTML = htmlOutLink
    })
  })
  .catch((err) => console.warn("Fetch failure at link card: \n\n" + err))

const parseMarkdown = (markdownText) => {
  /* pseudo Markdown converter, is enough here, no library is needed actually */
  const htmlText = markdownText
    .replace(/^# (.*$)/gim, "<h3>$1</h3>") // the headings
    .replace(/^## (.*$)/gim, "<h4>$1</h4>")
    .replace(/^### (.*$)/gim, "<h5>$1</h3>")
    .replace(/^#### (.*$)/gim, "<h6>$1</h4>")
    /* .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />") */ // we don't need that yet
    .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>") // bold and italic
    .replace(/\_(.*)\_/gim, "<i>$1</i>")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    .replace(/\n$/gim, "<br />")

  return htmlText.trim()

  // ref: https://www.bigomega.dev/markdown-parser
}

function getFormattedButtonFromData(url, label) {
  return `<a href="${url}">${label}</a>`
}
