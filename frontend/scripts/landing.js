const nextBtn = document.querySelector(".carousel__btn.next");
const prevBtn = document.querySelector(".carousel__btn.prev");
const track = document.querySelector(".carousel__track");
const dotsContainer = document.querySelector(".carousel__dots");
const slides = Array.from(track.children);

let carouselIndex = 0;

slides.forEach((slide, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});
const dotsArray = Array.from(dotsContainer.children);

nextBtn.addEventListener("click", () => {
  carouselIndex = carouselIndex + 1;
  if (carouselIndex >= slides.length) {
    carouselIndex = 0;
  }
  updateCarousel(carouselIndex);
});

prevBtn.addEventListener("click", () => {
  carouselIndex = carouselIndex - 1;
  if (carouselIndex < 0) {
    carouselIndex = slides.length - 1;
  }
  updateCarousel(carouselIndex);
});

dotsArray.forEach((dot, i) =>
  dot.addEventListener("click", () => {
    dotsArray.forEach((dot) => dot.classList.remove("active"));
    carouselIndex = i;
    updateCarousel(carouselIndex);
  })
);

function updateCarousel(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  dotsArray.forEach((dot) => dot.classList.remove("active"));
  dotsArray[index].classList.add("active");
}

setInterval(() => {
  carouselIndex = carouselIndex + 1;
  if (carouselIndex >= slides.length) {
    carouselIndex = 0;
  }
  updateCarousel(carouselIndex);
}, 5000);
