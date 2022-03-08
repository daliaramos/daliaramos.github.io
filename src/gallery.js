import { capitalizeFirst, finalizeName } from "./dog-api.js";

const mainContainer = document.querySelector("#main-container");

// TODO: append names
// Appends rows containing breed names and images to the main container.
const appendBreedRows = async (maxImgsPerBreed) => {
  const allBreeds = await getBreeds();
  for (let breed in allBreeds) {
    let newRow = document.createElement("div");
    newRow.setAttribute("class", "ro")
    newRow = await (newBreedRow(newRow, breed, 0, maxImgsPerBreed));
    mainContainer.append(newRow);
  }
}

// When given a newRow element,
// populates that element with up to (maxImg-minImg) images of the breed
// and returns it.
const newBreedRow = async (newRow, breed, minImg, maxImg) => {
    let imgUrls = (await (await fetch(`https://dog.ceo/api/breed/${breed}/images`)).json()).message;
    // This loop breaks as soon as it exhausts all the images available from the API.
    for (let i = minImg; i < maxImg; ++i) {
      let img = imgUrls[i];
      if (img === undefined) {
        break;
      }
      let imgElement = document.createElement("div")
      imgElement.setAttribute("class", "breed-img")
      imgElement.innerHTML = `<img src=${img} />`
      newRow.append(imgElement);
    }
    return newRow;
}

// Get an array containing the names of all breeds avaliable in the dog.ceo API.
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

appendBreedRows(10);