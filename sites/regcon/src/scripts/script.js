function toggleMenu() {
  const navbar = document.getElementById("navbar");
  
  // Проверяем, есть ли класс active
  if (navbar.classList.contains("active")) {
    navbar.classList.remove("active"); // Скрываем меню
  } else {
    navbar.classList.add("active"); // Показываем меню
  }
}
