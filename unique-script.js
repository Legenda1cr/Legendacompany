const uniqueSlider = document.querySelector('.unique-slider');
const uniqueSlides = document.querySelectorAll('.unique-slide');
const uniquePrevButton = document.querySelector('.unique-prev');
const uniqueNextButton = document.querySelector('.unique-next');

let uniqueCurrentIndex = 0;
let uniqueSlideInterval = setInterval(uniqueNextSlide, 4000); // Интервал 4 секунды

// Функция для перехода к следующему слайду
function uniqueNextSlide() {
  uniqueCurrentIndex = (uniqueCurrentIndex + 1) % uniqueSlides.length;
  updateUniqueSlider();
}

// Функция для перехода к предыдущему слайду
function uniquePrevSlide() {
  uniqueCurrentIndex = (uniqueCurrentIndex - 1 + uniqueSlides.length) % uniqueSlides.length;
  updateUniqueSlider();
}

// Обновление позиции слайдера
function updateUniqueSlider() {
  uniqueSlider.style.transform = `translateX(-${uniqueCurrentIndex * 100}%)`;
}

// Остановка автопрокрутки при нажатии на кнопку
function stopUniqueAutoSlide() {
  clearInterval(uniqueSlideInterval);
}

// Запуск автопрокрутки снова после нажатия
function startUniqueAutoSlide() {
  uniqueSlideInterval = setInterval(uniqueNextSlide, 4000);
}

// События для кнопок
uniqueNextButton.addEventListener('click', () => {
  stopUniqueAutoSlide();
  uniqueNextSlide();
  startUniqueAutoSlide();
});

uniquePrevButton.addEventListener('click', () => {
  stopUniqueAutoSlide();
  uniquePrevSlide();
  startUniqueAutoSlide();
});
