import { capitalizeFirst, finalizeName } from "./dog-api.js";

const mainContainer = document.querySelector("#main-container");

const newImgRow = () => {

}
/*
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
*/

const appendBreedRows = async () => {
  const allBreeds = await getBreeds();
  for (let breed in allBreeds) {
    let newRow = document.createElement("div");
    newRow.setAttribute("class", "row")
    newRow = await (newBreedRow(newRow, breed, 0, 3));
    mainContainer.append(newRow);
  }
}

const newBreedRow = async (newRow, breed, minImg, maxImg) => {
    let imgUrls = (await (await fetch(`https://dog.ceo/api/breed/${breed}/images`)).json()).message;
    for (let i = minImg; i < maxImg; ++i) {
      let imgElement = document.createElement("div")
      let img = imgUrls[i];
      if (img === undefined) {
        img = "https://upload.wikimedia.org/wikipedia/commons/b/b4/Circle_question_mark.png";
      }
      imgElement.setAttribute("class", "breed-img")
      imgElement.innerHTML = `<img src=${img} />`
      newRow.append(imgElement);
    }
    return newRow;
}

const getBreeds = async () => {
  const allBreedsResponse = (await fetch('https://dog.ceo/api/breeds/list/all'));
  return (await allBreedsResponse.json()).message;
}
/*
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
      mainContainer.append(card);
    }
}
*/

appendBreedRows();