// Функция инициализации наблюдателя
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
  
    // Проверяем, поддерживает ли браузер IntersectionObserver
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Добавляем класс видимости
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Отключаем наблюдение для уже видимых элементов
          }
        });
      }, {
        threshold: 0.1 // Процент видимости элемента, при котором срабатывает анимация
      });
  
      // Начинаем наблюдать за каждым элементом
      elements.forEach(element => {
        observer.observe(element);
      });
    } else {
      // Фолбэк для браузеров без поддержки IntersectionObserver (например, IE)
      window.addEventListener('scroll', handleScrollFallback);
      handleScrollFallback(); // Вызываем при загрузке страницы
    }
  }
  
  // Фолбэк на случай отсутствия IntersectionObserver
  function handleScrollFallback() {
    const elements = document.querySelectorAll('.animate-on-scroll');
  
    elements.forEach(element => {
      if (isElementInViewport(element)) {
        element.classList.add('visible');
      }
    });
  }
  
  // Проверка видимости элемента (фолбэк для старых браузеров)
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Запуск скрипта после загрузки страницы
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
  