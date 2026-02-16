let slideIndex = 0;

const slidesContainer = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dots span");

const totalSlides = slides.length;

function showSlide(index) {

  if (index >= totalSlides) slideIndex = 0;
  if (index < 0) slideIndex = totalSlides - 1;

  slidesContainer.style.transform =
    `translateX(-${slideIndex * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");
}

function moveSlide(n) {
  slideIndex += n;
  showSlide(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  showSlide(slideIndex);
}

/* Auto Slide */
setInterval(() => {
  slideIndex++;
  showSlide(slideIndex);
}, 4000);

showSlide(slideIndex);


function searchFood() {
  let input = document.getElementById("searchBar").value.toLowerCase();
  let items = document.querySelectorAll(".menu-item");

  items.forEach(item => {
    let foodName = item.querySelector("h3").innerText.toLowerCase();

    if (foodName.includes(input)) {
      item.style.display = "block";   // show matched item
    } else {
      item.style.display = "none";    // hide unmatched item
    }
  });
}

