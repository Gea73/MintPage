//DOM elements
const nextBtn = document.querySelector(".carousel__btn.next");
const prevBtn = document.querySelector(".carousel__btn.prev");
const track = document.querySelector(".carousel__track");
const dotsContainer = document.querySelector(".carousel__dots");

//Define a array of all slides on track
const slides = Array.from(track.children);

let carouselIndex = 0;

//Create a dot button for each slide
slides.forEach((slide, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  // put the dot on the container
  dotsContainer.appendChild(dot);
});
//Define arrays of all dots in container
const dotsArray = Array.from(dotsContainer.children);

//Update carousel and index when next clicked
nextBtn.addEventListener("click", () => {
  carouselIndex = carouselIndex + 1;
  if (carouselIndex >= slides.length) {
    carouselIndex = 0;
  }
  updateCarousel(carouselIndex);
});


//Update carousel and index when prev clicked
prevBtn.addEventListener("click", () => {
  carouselIndex = carouselIndex - 1;
  if (carouselIndex < 0) {
    carouselIndex = slides.length - 1;
  }
  updateCarousel(carouselIndex);
});

//Update carousel when a dot is clicked
dotsArray.forEach((dot, i) =>
  dot.addEventListener("click", () => {
    
    dotsArray.forEach((dot) => dot.classList.remove("active"));
    carouselIndex = i;
    updateCarousel(carouselIndex);
  }),
);

function updateCarousel(index) {
  //move vertical position of the slide to the index
  track.style.transform = `translateX(-${index * 100}%)`;
  dotsArray.forEach((dot) => dot.classList.remove("active"));
  dotsArray[index].classList.add("active");
}

setInterval(() => {
  //each 5s change the slide
  carouselIndex = carouselIndex + 1;
  if (carouselIndex >= slides.length) {
    carouselIndex = 0;
  }
  updateCarousel(carouselIndex);
}, 5000);
