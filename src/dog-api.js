export const capitalizeFirst = (toCapitalize) => {
  return toCapitalize[0].toUpperCase() + toCapitalize.slice(1);
};

export const finalizeName = (breedName) => {
  return tryAddDogSuffix(fixName(breedName));
};

export const fixSubNames = (subBreed) => {
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

export const tryAddDogSuffix = (breedName) => {
  let str = breedName.toLowerCase();
  if (str.includes("hound") || str.includes("hund") || str.includes("dog"))
    return breedName;
  else return breedName + " Dog";
};

export const fixName = (breedName) => {
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
