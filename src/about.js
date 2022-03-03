const card = document.getElementById("nicole");

card.addEventListener("click", flipCard);

function flipCard() {
    card.classList.toggle("flipCard");
}