const row = document.querySelector(".row");
const userInput = document.querySelector("#breed");

userInput.addEventListener("input", search);

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

  //console.log(data);
};

function getBreedInfo(data) {
  let para = document.createElement("p");
  let desc = data.query.pages;
  let pageID = parseInt(Object.getOwnPropertyNames(desc));
  para.innerHTML = desc[pageID].extract;
  return para;
}

function emptyInput(input) {
  if (input === "" || input === " ") {
    return false;
  } else return true;
}

function search(event) {
  event.preventDefault();
  let breedName = userInput.value;
  //call create all cards.
  if (emptyInput(breedName)) {
    createAllCards(breedName.toLowerCase());
  }
}

const capitalizeFirst = (toCapitalize) => {
  return toCapitalize[0].toUpperCase() + toCapitalize.slice(1);
};

const finalizeName = (breedName) => {
  return tryAddDogSuffix(fixName(breedName));
};

const fixSubNames = (subBreed) => {
  if (subBreed === "kerryblue terrier") {
    return `Kelly Blue Terrier`;
  } else if (subBreed === "germanlonghair pointer") {
    return `German Longhaired Pointer`;
  } else if (subBreed === "westhighland terrier") {
    return `West Highland Terrier`;
  } else {
    return subBreed;
  }
};

const tryAddDogSuffix = (breedName) => {
  str = breedName.toLowerCase();
  if (str.includes("hound") || str.includes("hund") || str.includes("dog"))
    return breedName;
  else return breedName + " Dog";
};

const fixName = (breedName) => {
  switch (breedName) {
    case "Shepherd Australian":
      breedName = "Australian Shepherd";
      break;
    case "Lapphund Finnish":
      breedName = "Finnish Lapphund";
      break;
    case "Mix":
      breedName = "Mixed";
      break;
    default:
      break;
  }
  return breedName;
};

//creates a card as dog breed is being searched
const createCard = (url, breedName, breedInfo) => {
  let cardSize = document.createElement("div");
  let card = document.createElement("div");
  let image = document.createElement("img");
  let cardBody = document.createElement("div");
  let cardTitle = document.createElement("h3");
  //  let dogInfo = document.createElement("p");
  cardSize.setAttribute("class", "col-xs-12 col-sm-6 col-lg-4");
  card.setAttribute("class", "card");
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
  cardBody.setAttribute("class", "card-body");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = `${breedName}`;

  cardBody.append(cardTitle);
  cardBody.append(breedInfo);
  card.append(image);
  card.append(cardBody);
  cardSize.append(card);

  return cardSize;
};

const createAllCards = async (input) => {
  const allBreedsResponse = await fetch("https://dog.ceo/api/breeds/list/all");
  const allBreedsObj = (await allBreedsResponse.json()).message;
  const breedNames = [];
  const breedImgsSrcs = [];
  const subBreeds = [];

  getAllBreeds(breedNames, breedImgsSrcs, subBreeds, allBreedsObj);

  if (breedNames.includes(input) === true) {
    const breedName = input;
    input = input.split(" ");
    const searchImgBreed = `${`https://dog.ceo/api/breed/${input[0].toLowerCase()}/images/random`}`;
    const breedImage = (await (await fetch(searchImgBreed)).json()).message;

    const breedInfo = await dogDesc(breedName);
    const card = createCard(breedImage, breedName, breedInfo);
    row.append(card);
    //    }
  } else {
    const searchBreedNames = subBreeds.filter(
      (element) => element.breed === `${input}`
    );
    console.log(searchBreedNames);
    if (searchBreedNames.length > 0) {
      for (let i = 0; i < searchBreedNames.length; ++i) {
        const breedName = searchBreedNames[i].sub;
        const breedImage = (
          await (await fetch(searchBreedNames[i].images)).json()
        ).message;
        let sub = fixSubNames(searchBreedNames[i].sub);
        console.log(sub);
        const breedInfo = await dogDesc(sub);
        const card = createCard(breedImage, breedName, breedInfo);
        row.append(card);
      }
    }
  }
};

function getAllBreeds(breedNames, breedImgsSrcs, subBreeds, allBreedsObj) {
  for (breed in allBreedsObj) {
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
        breedName = subBreed + " " + breed;
        breedImg =
          "https://dog.ceo/api/breed/" +
          breed +
          "/" +
          subBreed +
          "/images/random";
        subbreeds.breed = breed;
        subbreeds.sub = breedName;
        subbreeds.images = breedImg;

        subBreeds.push(subbreeds);
      }
    }
  }
}