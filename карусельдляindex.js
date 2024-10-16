const track = document.querySelector('.carousel-track');
let index = 0; // Индекс текущего слайда
const totalItems = 5; // Общее количество элементов в карусели

function moveCarousel() {
    index++;
    if (index >= totalItems) {
        index = 0;
    }
    const translateX = index * -100 / totalItems;
    track.style.transform = `translateX(${translateX}%)`;
}

setInterval(moveCarousel, 3000); // Смена каждые 3 секунды
