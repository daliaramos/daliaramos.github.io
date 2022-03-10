import { capitalizeFirst, finalizeName, fixSubNames } from "./dog-api.js";

const breedNames = [];
const breedImgsSrcs = [];
const subBreeds = [];

const getResponse = async () => {
  const allBreedsResponse = await fetch("https://dog.ceo/api/breeds/list/all");
  const allBreedsObj = (await allBreedsResponse.json()).message;
  return allBreedsObj;
};

getResponse().then((data) => {
  getAllBreeds(breedNames, breedImgsSrcs, subBreeds, data);
});

const row = document.querySelector(".row");
const userInput = document.querySelector("#breed");
userInput.addEventListener("input", search);
const about = document.querySelector("#nav-about-tab");
const galleryButtn = document.querySelector("#nav-gallery-tab");
const home = document.querySelector("#nav-home-tab");
about.addEventListener("click", goToAbout);
galleryButtn.addEventListener("click", goToGallery);
home.addEventListener("click", goToHome);

//fetch the data and searches for the input value
const dogDesc = async (breedName) => {
  //Wiki API
  let wikiUrl = "https://en.wikipedia.org/w/api.php";
  const params = {
    origin: "*",
    format: "json",
    action: "query",
    prop: "extracts",
    exsentences: 1,
    exintro: false,
    explaintext: true,
    generator: "search",
    gsrlimit: 1,
  };

  params.gsrsearch = breedName;

  try {
    let { data } = await axios.get(wikiUrl, { params });
    return getBreedInfo(data);
  } catch (error) {
    //delete current card
    console.log(error);
  }
};

//gets the data from the wikimedia api
function getBreedInfo(data) {
  let para = document.createElement("p");
  let desc = data.query.pages;
  let pageID = parseInt(Object.getOwnPropertyNames(desc));
  para.innerHTML = desc[pageID].extract;
  return para;
}

//checks input value
function emptyInput(input) {
  if (input === "" || input === " ") {
    return false;
  } else {
    return true;
  }
}

//eventhandler for the input field
function search(event) {
  event.preventDefault();
  let breedName = userInput.value;
  //call create all cards.
  if (emptyInput(breedName)) {
    createAllCards(breedName.toLowerCase());
  }

  removeCards();
}

function removeCards() {
  while (row.firstChild) {
    row.removeChild(row.firstChild);
  }
}
//creates a card as dog breed is being searched
function createCard(url, breedName, breedInfo) {
  let card = document.createElement("div");
  let cardInner = document.createElement("div");
  let cardFront = document.createElement("div");
  let cardBack = document.createElement("div");
  let cardTitle = document.createElement("h5");
  let image = document.createElement("img");

  card.setAttribute("class", "flip-card col-xs-12 col-sm-6 col-lg-4");
  cardInner.setAttribute("class", "flip-card-inner");
  cardFront.setAttribute("class", "flip-card-front");
  cardBack.setAttribute("class", "flip-card-back");
  cardTitle.setAttribute("class", "flip-card-title pt-2");

  image.setAttribute("src", `${url}`);
  image.setAttribute("class", "card-img-top");
  switch (breedName[0]) {
    case "A" || "E" || "I" || "O" || "U":
      image.setAttribute("alt", `An ${breedName}`);
      break;
    default:
      image.setAttribute("alt", `A ${breedName}`);
      break;
  }
  let capitalize = capitalizeFirst(breedName);
  let finalName = finalizeName(capitalize);
  cardTitle.innerHTML = `${finalName}`;

  cardFront.append(image);
  cardFront.append(cardTitle);

  cardBack.append(breedInfo);

  cardInner.append(cardFront);
  cardInner.append(cardBack);
  card.append(cardInner);

  return card;
}

//Created the card when the input value is found on the list of breeds
const createAllCards = async (input) => {
  if (breedNames.includes(input) === true) {
    disableInput();
    const breedName = input;
    const breedImage = getImage(input);
    const breedInfo = dogDesc(finalizeName(breedName));
    const [image, info] = await Promise.all([breedImage, breedInfo]);
    appendCard(image.message, breedName, info);
  } else {
    const searchBreedNames = subBreeds.filter(
      (element) => element.breed === `${input}`
    );
    if (searchBreedNames.length > 0) {
      disableInput();
      for (let i = 0; i < searchBreedNames.length; ++i) {
        const breedName = searchBreedNames[i].sub;
        const breedImage = (await fetch(searchBreedNames[i].images)).json();
        let sub = fixSubNames(searchBreedNames[i].sub);
        const breedInfo = dogDesc(finalizeName(sub));
        const [image, info] = await Promise.all([breedImage, breedInfo]);
        appendCard(image.message, breedName, info);
      }
    } else {
      const search = subBreeds.filter((element) => element.sub === `${input}`);
      if (search.length > 0) {
        cardCreated = true;
        disableInput();
        const breedName = search[0].sub;
        const breedImage = (await fetch(search[0].images)).json();
        let sub = fixSubNames(search[0].sub);
        const breedInfo = dogDesc(finalizeName(sub));
        const [image, info] = await Promise.all([breedImage, breedInfo]);
        appendCard(image.message, breedName, info);
      }
    }
  }
};

//Fetch breed images and breed names
function getAllBreeds(breedNames, breedImgsSrcs, subBreeds, allBreedsObj) {
  for (let breed in allBreedsObj) {
    let breedName = breed;

    let breedImg = "https://dog.ceo/api/breed/";
    //  console.log(allBreedsObj);
    if (allBreedsObj[breed].length == 0) {
      breedName = breedName;
      breedImg = breedImg + breed + "/images/random";
      breedNames.push(breedName);
      breedImgsSrcs.push(breedImg);
    } else {
      // if the breed has sub-breeds
      // traverse the sub-breeds and add them to the list
      for (let i = 0; i < allBreedsObj[breed].length; ++i) {
        let subbreeds = {};
        const subBreed = allBreedsObj[breed][i];
        breedImg = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`;
        subbreeds.breed = breed;
        subbreeds.sub = subBreed + " " + breed;
        subbreeds.images = breedImg;
        subBreeds.push(subbreeds);
      }
    }
  }
}

//disables and enables input field
function disableInput() {
  userInput.disabled = true;
}

function enableInput() {
  userInput.disabled = false;
}

function appendCard(breedImage, breedName, breedInfo) {
  const card = createCard(breedImage, breedName, breedInfo);
  row.append(card);
  enableInput();
}
function getImage(input) {
  input = input.split(" ");
  const searchImgBreed = `${`https://dog.ceo/api/breed/${input[0].toLowerCase()}/images/random`}`;

  const breedImage = fetch(searchImgBreed).then((data) => {
    const image = data.json();
    return image;
  });
  return breedImage;
}

//Redirects user to the next page
function goToAbout() {
  aboutLocation();
}
function goToGallery() {
  galleryLocation();
}
function goToHome() {
  homeLocation();
}

/*
  References: 
  wikimedia api I followed https://www.youtube.com/watch?v=yqwHxAH1xrw&ab_channel=danascript
  To remove all child elements I read at https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
  Promise all I read at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  and https://www.learnwithjason.dev/blog/keep-async-await-from-blocking-execution
*/
