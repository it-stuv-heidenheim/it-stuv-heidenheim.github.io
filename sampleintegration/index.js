const cardCode = "bUqqHU2g";

const url = `https://api.trello.com/1/cards/${cardCode}/`;

fetch(url).then((res) => {
  res.json().then((data) => {
    console.warn(data);
  });
});
