let row = document.querySelector(".row");

//input event

//creates a card as dog breed is being searched
const createCard = (url, breedName, breedInfo) => {
  let cardSize = document.createElement("div");
  let card = document.createElement("div");
  let image = document.createElement("img");
  let cardBody = document.createElement("div");
  let cardTitle = document.createElement("h3");
  let dogInfo = document.createElement("p");
  cardSize.setAttribute("class", "col-xs-12 col-sm-6 col-lg-4");
  card.setAttribute("class", "card");
  image.setAttribute("src", `${url}`);
  image.setAttribute("class", "card-img-top");
  image.setAttribute("alt", `Image of ${breedName}`);
  cardBody.setAttribute("class", "card-body");
  cardTitle.setAttribute("class", "card-title");

  dogInfo.innerHTML = `${breedInfo}`;
  cardBody.append(cardTitle);
  cardBody.append(dogInfo);
  card.append(image);
  card.append(cardBody);
  cardSize.append(card);

  return cardSize;
};

let cards = createCard(
  "https://place.dog/400/400",
  "golden retriever",
  `Lorem ipsum dolor sit amet consectetur adipisicing elit
								Molestias alias error ex a repellat in est perferendis
								commodi quam temporibus consectetur maiores unde sit
								expedita distinctio, mollitia officiis ipsum? Quidem!`
);

row.append(cards);
