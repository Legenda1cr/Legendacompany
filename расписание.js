// JavaScript для управления выдвижением меню
const menuTitles = document.querySelectorAll('.menu-title');

menuTitles.forEach(title => {
    title.addEventListener('click', () => {
        const content = title.nextElementSibling;

        // Проверяем, открыто ли меню
        const isVisible = content.style.maxHeight;

        // Закрыть все открытые меню
        document.querySelectorAll('.menu-content').forEach(item => {
            item.style.maxHeight = null; // Устанавливаем max-height в null
        });

        // Если текущее меню не открыто, открыть его
        if (!isVisible) {
            content.style.maxHeight = content.scrollHeight + "px"; // Устанавливаем max-height в scrollHeight
        }
    });
});
