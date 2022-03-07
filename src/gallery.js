import { capitalizeFirst, finalizeName } from "./dog-api.js";

const row = document.querySelector(".row");

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
  switch (breedName[0]){
    case ("A" || "E" || "I" || "O" || "U"):
      image.setAttribute("alt", `An ${breedName}`);
      break;
    default:
      image.setAttribute("alt", `A ${breedName}`);
      break;
  }
  cardBody.setAttribute("class", "card-body");
  cardTitle.setAttribute("class", "card-title");

  cardTitle.innerHTML = `${breedName}`;
  dogInfo.innerHTML = `${breedInfo}`;
  cardBody.append(cardTitle);
  cardBody.append(dogInfo);
  card.append(image);
  card.append(cardBody);
  cardSize.append(card);

  return cardSize;
};

const createAllCards = async () => {
    const allBreedsResponse = (await fetch('https://dog.ceo/api/breeds/list/all'));
    const allBreedsObj = (await allBreedsResponse.json()).message;
    const breedNames = [];
    const breedImgsSrcs = [];

    console.log(allBreedsObj);
    for (let breed in allBreedsObj) {
      let breedName = capitalizeFirst(breed);
      let breedImg = "https://dog.ceo/api/breed/";

      if (allBreedsObj[breed].length == 0) {
        breedName = finalizeName(breedName);
        breedImg = breedImg + breed + "/images/random";
        breedNames.push(breedName);
        breedImgsSrcs.push(breedImg);
      }
      else {  // if the breed has sub-breeds
        // traverse the sub-breeds and add them to the list
        for (let i = 0; i < allBreedsObj[breed].length; ++i) {
          const subBreed = allBreedsObj[breed][i];
          breedName = capitalizeFirst(subBreed)
            + " "
            + capitalizeFirst(breed);
          breedName = finalizeName(breedName);
          breedImg = "https://dog.ceo/api/breed/" + breed + "/" + allBreedsObj[breed][i] + "/images/random";
          breedNames.push(breedName);
          breedImgsSrcs.push(breedImg);
        }
      }
    }

    for (let i = 0; i < breedNames.length; ++i) {
      const breedName = breedNames[i];
      const breedImg = (await
          (await fetch(breedImgsSrcs[i])
          ).json())
        .message;
      const breedInfo = "Lorem ipsum";
      const card = createCard(breedImg, breedName, breedInfo);
      row.append(card);
    }
}

createAllCards();