document.addEventListener("DOMContentLoaded", () => {
  const uniqueSlider = document.querySelector('.unique-slider');
  const uniqueSlides = document.querySelectorAll('.unique-slide');
  const uniquePrevButton = document.querySelector('.unique-prev');
  const uniqueNextButton = document.querySelector('.unique-next');

  if (!uniqueSlider || !uniquePrevButton || !uniqueNextButton || uniqueSlides.length === 0) {
    console.error("Не удалось найти слайдер или кнопки!");
    return;
  }

  let uniqueCurrentIndex = 0;
  let uniqueSlideWidth = uniqueSlides[0].clientWidth;
  let uniqueSlideInterval = setInterval(uniqueNextSlide, 4000); // Автопрокрутка каждые 4 секунды

  // Функция обновления ширины при изменении размера окна
  window.addEventListener('resize', () => {
    uniqueSlideWidth = uniqueSlides[0].clientWidth;
    updateUniqueSlider();
  });

  // Функция для перехода к следующему слайду
  function uniqueNextSlide() {
    uniqueCurrentIndex = (uniqueCurrentIndex + 1) % uniqueSlides.length;
    console.log('Следующий слайд:', uniqueCurrentIndex);
    updateUniqueSlider();
  }

  // Функция для перехода к предыдущему слайду
  function uniquePrevSlide() {
    uniqueCurrentIndex = (uniqueCurrentIndex - 1 + uniqueSlides.length) % uniqueSlides.length;
    console.log('Предыдущий слайд:', uniqueCurrentIndex);
    updateUniqueSlider();
  }

  // Функция обновления позиции слайдера
  function updateUniqueSlider() {
    uniqueSlider.style.transform = `translateX(-${uniqueCurrentIndex * uniqueSlideWidth}px)`;
    uniqueSlider.style.transition = 'transform 0.5s ease-in-out';
  }

  // Остановка автопрокрутки при взаимодействии
  function stopUniqueAutoSlide() {
    clearInterval(uniqueSlideInterval);
  }

  // Перезапуск автопрокрутки
  function startUniqueAutoSlide() {
    uniqueSlideInterval = setInterval(uniqueNextSlide, 4000);
  }

  // События для кнопок
  uniqueNextButton.addEventListener('click', () => {
    console.log('Нажата кнопка "Следующий"');
    stopUniqueAutoSlide();
    uniqueNextSlide();
    startUniqueAutoSlide();
  });

  uniquePrevButton.addEventListener('click', () => {
    console.log('Нажата кнопка "Предыдущий"');
    stopUniqueAutoSlide();
    uniquePrevSlide();
    startUniqueAutoSlide();
  });
});
