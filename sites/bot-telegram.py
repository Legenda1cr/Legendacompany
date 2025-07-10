import logging
import random
from telegram import Bot
from telegram.ext import Application, CommandHandler
from apscheduler.schedulers.background import BackgroundScheduler
import asyncio

# Ваш API token
TOKEN = '7735279875:AAEv2_TALe0OzvZUIGbTksvQKPGoJDZHypk'

# Данные о сотрудниках (вместо чтения из Excel)
employees = [
    {'name': 'Иван Иванов', 'birthday': '01-01'},
    {'name': 'Мария Петрова', 'birthday': '15-03'},
    {'name': 'Алексей Смирнов', 'birthday': '22-07'},
    {'name': 'Екатерина Волкова', 'birthday': '03-11'}
]

# Список разнообразных поздравлений
def generate_birthday_message(name):
    messages = [
        f"🎉 Дорогой {name}! Поздравляем тебя с этим замечательным днем! Пусть каждый новый год приносит тебе счастье, удачу и множество радостных моментов! 🌟",
        f"🎂 {name}, с Днем Рождения! Желаем тебе ярких эмоций, успехов во всех начинаниях и безмерного счастья! Пусть сбудется все, о чем ты мечтаешь! 🎈",
        f"🌟 Поздравляем с Днем Рождения, {name}! Пусть этот день станет началом нового, еще более удачного года в твоей жизни! Здоровья, радости и успеха во всем! 🍀",
        f"🎉 {name}, с Днем Рождения! Пусть в этот день тебе сопутствуют только самые приятные события, а впереди будет только светлый и счастливый путь! 🎁",
        f"🥳 {name}, поздравляем тебя с этим важным днем! Пусть он принесет тебе много счастья, удачи, радости и исполнения всех желаний! Пусть каждый день будет особенным! 🌷",
        f"🎈 {name}, с Днем Рождения! Желаем тебе море счастья, океан удачи и реки позитивных эмоций! Пусть каждый день будет ярким и полным вдохновения! 🌞"
    ]
    
    # Выбираем случайное поздравление из списка
    return random.choice(messages)

# Функция для отправки поздравления
async def send_birthday_wish(context):
    for employee in employees:
        message = generate_birthday_message(employee['name'])
        await context.bot.send_message(chat_id='@ggwpsomatch', text=message)

# Настройка планировщика для отправки сообщения каждую минуту
def setup_scheduler(application):
    scheduler = BackgroundScheduler()
    # Запускаем задачу каждую минуту
    scheduler.add_job(lambda: send_birthday_wish(application), 'interval', minutes=1)
    scheduler.start()

# Основная функция
async def main():
    # Создаем приложение
    application = Application.builder().token(TOKEN).build()

    # Устанавливаем планировщик
    setup_scheduler(application)

    # Запускаем бота
    await application.run_polling()  # Здесь уже происходит управление циклом событий

if __name__ == '__main__':
    logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                        level=logging.INFO)
    logging.info("Запуск бота...")

    # Просто вызываем main напрямую, так как run_polling сам управляет циклом событий
    asyncio.run(main())
