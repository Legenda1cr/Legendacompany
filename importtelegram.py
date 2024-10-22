import telegram
from telegram.ext import Updater, CommandHandler
import schedule
import time
from datetime import datetime

# Ваш токен бота
TOKEN = 'YOUR_BOT_API_TOKEN'
CHAT_ID = 'YOUR_CHAT_ID'  # ID вашего канала или чата

# Функция для отправки сообщения
def send_birthday_message():
    bot = telegram.Bot(token=TOKEN)
    message = "🎉 Поздравляем с днём рождения!"
    bot.send_message(chat_id=CHAT_ID, text=message)

# Функция, которая проверяет текущую дату и отправляет сообщение, если сегодня День рождения
def check_birthday():
    today = datetime.now().strftime("%d-%m")
    # Дата рождения в формате день-месяц
    birthday = "22-10"  # Например, 22 октября
    if today == birthday:
        send_birthday_message()

# Планируем выполнение задачи каждый день
schedule.every().day.at("09:00").do(check_birthday)  # Задаём время для отправки

# Основной цикл, который проверяет расписание
while True:
    schedule.run_pending()
    time.sleep(60)  # Проверяем задачи каждую минуту
