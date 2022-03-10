let i = 0;
let text = "Can you guess their favorite dog breed...?";
let speed = 50;

window.onload = function typeWriter() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    ++i;
    setTimeout(typeWriter, speed);
  }
};

const gallery = document.querySelector("#nav-gallery-tab");
const search = document.querySelector("#nav-search-tab");
const home = document.querySelector("#nav-home-tab");
gallery.addEventListener("click", goToGallery);
search.addEventListener("click", goToSearch);
home.addEventListener("click", goToHome);
function goToHome() {
  homeLocation();
}
function goToSearch() {
  searchLocation();
}
function goToGallery() {
  galleryLocation();
}
