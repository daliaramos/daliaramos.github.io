import { capitalizeFirst, finalizeName } from "./dog-api.js";

const mainContainer = document.querySelector("#main-container");

const getArticle = (breed) => {
    let article = "a";
    switch (breed[0].toUpperCase()) {
      case "A" || "E" || "I" || "O" || "U":
        article = article.concat("n");
        break;
      default:
        break;
    }
    return article;
}

// TODO: append names
// Appends rows containing breed names and images to the main container.
const appendBreedRows = async (maxImgsPerBreed) => {
  const allBreeds = await getBreeds();
  for (let breed in allBreeds) {
    let newRow = document.createElement("div");
    newRow.setAttribute("class", "r")
    newRow = await (newBreedImgRow(newRow, breed, 0, maxImgsPerBreed));
    mainContainer.append(newRow);
  }
}

const newBreedName = (breedName) => {
  let nameElement = document.createElement("div");
  nameElement.setAttribute("class", "breed-name-container");

  let fixedBreedName = finalizeName(breedName);
  nameElement.innerHTML = `<span class="breed-name">${fixedBreedName}s</span>`;
  return nameElement;
}

// When given a newRow element,
// populates that element with up to (maxImg-minImg) images of the breed
// and returns it.
const newBreedImgRow = async (newRow, breed, minImg, maxImg) => {
    let newImgRow = document.createElement("div");
    newImgRow.setAttribute("class", "scroll-row");
    newImgRow.setAttribute("tabindex", "0");
    let nameElement = newBreedName(breed);
    newImgRow.append(nameElement);
    let imgUrls = (await (await fetch(`https://dog.ceo/api/breed/${breed}/images`)).json()).message;
    // This loop breaks as soon as it exhausts all the images available from the API.
    for (let i = minImg; i < maxImg; ++i) {
      let img = imgUrls[i];
      if (img === undefined) {
        break;
      }
      let imgElement = document.createElement("div")
      imgElement.setAttribute("class", "breed-img")
      imgElement.setAttribute("onclick", "viewModal()")
      let n = i+1;
      imgElement.innerHTML = `<img src=${img} alt="Sample ${n} from gallery of ${breed} dogs" />`
      newImgRow.append(imgElement);
    }
    newRow.append(newImgRow);
    return newRow;
}

// Get an array containing the names of all breeds avaliable in the dog.ceo API.
const getBreeds = async () => {
  const allBreedsResponse = (await fetch('https://dog.ceo/api/breeds/list/all'));
  return (await allBreedsResponse.json()).message;
}

appendBreedRows(10);