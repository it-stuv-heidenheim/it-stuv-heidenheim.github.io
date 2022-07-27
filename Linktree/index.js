/* CONFIG SECTION */

const cardCode = "zawJegnv";
const htmlAnchorId = "trello-linktree";

/* LOGIC SECTION */

const url = `https://api.trello.com/1/cards/${cardCode}`;

const fallbackText =
  "There hasn't been added any content yet. Please come back again later!";

fetch(url).then((res) => {
  res.json().then(
    (data) => {
      var desc = data.desc;

      var surroundingNode = '<div class="wp-block-columns">';

      var lines = desc.split("\n");

      var lineNodes = ""; // this will contain all the lines styled based
      // on their content

      lines.forEach((line) => {
        var lineNode = ""; // this will be the html to be appended

        line = line.trim();
        if (line == "") return; // next line if empty

        console.log(line);

        if (line.includes("://")) {
          // pretty easy link detection system:
          // line contains a url, is therefore expected as label and link

          var labelOfLink = line.substr(0, line.indexOf(":")),
            urlOfLink = line.substr(line.indexOf(":") + 1);

          lineNode = getSimpleHeadingLink(labelOfLink, urlOfLink);
        } else {
          // if no line with link, then treated as heading

          console.log("detected heading: " + line);

          var headingNode = '<h2 style="margin-top: 50px">' + line + "</h2>";

          lineNode = headingNode;
        }

        lineNodes += lineNode;
      });

      var trelloAnchor = document.getElementById(htmlAnchor);

      trelloAnchor.innerHTML = lineNodes;
    },
    (err) => alert("Fetch failure: \n\n" + err)
  );
});

const writeWithTag = (tag, text) => {
  return `<${tag}>${text}</${tag}>`;
};

const getSimpleHeadingLink = (label, url) =>
  `<h3><a href="${url}">${label}</a></h3>`;

const getBtnHtml = (label, url) =>
  `<div class="elementor-button-wrapper">
			<a href="${url}" class="elementor-button-link elementor-button elementor-size-sm" role="button">
						<span class="elementor-button-content-wrapper">
						<span class="elementor-button-text">${label}</span>
		</span>
					</a>
		</div>`;
