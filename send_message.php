<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные формы
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Email, на который будет отправлено сообщение
    $to = 'fulladress98@gmail.com';

    // Заголовки письма
    $subject = "Новое сообщение с сайта от $name";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Тело письма
    $body = "
        <h2>Новое сообщение</h2>
        <p><strong>Имя:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Сообщение:</strong><br>$message</p>
    ";

    // Отправляем письмо
    if (mail($to, $subject, $body, $headers)) {
        // Успешная отправка
        echo "<script>alert('Сообщение успешно отправлено!'); window.location.href='index.html';</script>";
    } else {
        // Ошибка при отправке
        echo "<script>alert('Ошибка отправки. Пожалуйста, попробуйте снова.'); window.location.href='index.html';</script>";
    }
}
?>
