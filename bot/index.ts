import 'dotenv/config';

import { Telegraf } from 'telegraf';

const token = process.env.TELEGRAM_API_TOKEN;

export default function getBot() {
    const bot = new Telegraf(token);

    // bot.on()

    return bot;
}