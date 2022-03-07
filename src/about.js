let i = 0;
let text = "Can you guess their favorite dog breed...?";
let speed = 50; 

window.onload = function typeWriter() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    ++i;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();