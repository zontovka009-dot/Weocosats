import os
import asyncio
from pathlib import Path
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / ".env")

TOKEN = os.getenv("BOT_TOKEN", "").strip()
WEBAPP_URL = os.getenv("WEBAPP_URL", "http://localhost:5173").strip()

if not TOKEN:
    raise RuntimeError("BOT_TOKEN is empty. Put it into the root .env file.")

dp = Dispatcher()

@dp.message(CommandStart())
async def start(message: Message):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Открыть Wathis", web_app=WebAppInfo(url=WEBAPP_URL))]
    ])
    await message.answer(
        "🎧 Wathis — смотрим вместе.\n\nОткрой приложение и создай комнату.",
        reply_markup=keyboard,
    )

async def main():
    bot = Bot(TOKEN)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
