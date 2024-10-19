let currentIndex = 0;
              const slides = document.querySelectorAll('.slide');
              const slider = document.getElementById('slider');
              const totalSlides = slides.length;
          
    
              // Функция для обновления слайдера
              function updateSlider() {
                  const offset = -currentIndex * 100; // Вычисляем смещение
                  slider.style.transform = `translateX(${offset}%)`; // Применяем смещение
              }
          
              // Обработчик кнопки "Предыдущий"
              document.getElementById('prev').addEventListener('click', () => {
                  currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1; // Циклический сдвиг
                  updateSlider();
              });
          
              // Обработчик кнопки "Следующий"
              document.getElementById('next').addEventListener('click', () => {
                  currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0; // Циклический сдвиг
                  updateSlider();
              });
          
              // Обработчик кнопки "Подробнее"
              document.getElementById('details').addEventListener('click', () => {
                  const currentSlideImage = slides[currentIndex].querySelector('img').src; // Получаем текущее изображение
                  document.getElementById('fullscreenImage').src = currentSlideImage; // Устанавливаем источник для полноэкранного изображения
                  document.getElementById('fullscreen').style.display = 'flex'; // Показываем полноэкранное изображение
              });
          
              // Обработчик закрытия полноэкранного изображения
              document.getElementById('closeFullscreen').addEventListener('click', () => {
                  document.getElementById('fullscreen').style.display = 'none'; // Скрываем полноэкранное изображение
              });
          
              // Закрытие по клику вне изображения
              document.getElementById('fullscreen').addEventListener('click', (event) => {
                  if (event.target === event.currentTarget) {
                      document.getElementById('fullscreen').style.display = 'none'; // Скрываем полноэкранное изображение
                  }
              });