const track = document.querySelector('.carousel-track');
let index = 0; // Индекс текущего слайда
const totalItems = 5; // Общее количество элементов в карусели

function moveCarousel() {
    index++;
    if (index >= totalItems) {
        index = 0;
    }

    // Проверяем ширину экрана
    const screenWidth = window.innerWidth;
    
    // Если ширина меньше 500px, меняем прокрутку на -500, иначе -100
    let translateX;
    if (screenWidth < 500) {
        translateX = index * -100; // Прокрутка для мобильных
    } else {
        translateX = index * -33; // Прокрутка для десктопа
    }

    track.style.transform = `translateX(${translateX}%)`;
}

setInterval(moveCarousel, 3000); // Смена каждые 3 секунды

// Также можем отслеживать изменение ширины экрана при изменении размера окна
window.addEventListener('resize', () => {
    // Если изменяется ширина экрана, перезапускаем карусель с нужными значениями
    moveCarousel();
});
