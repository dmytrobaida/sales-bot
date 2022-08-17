import 'dotenv/config';

import { Telegraf } from 'telegraf';

import os from 'os';

const token = process.env.TELEGRAM_API_TOKEN;

export default async function getBot() {
    const bot = new Telegraf(token);
    await bot.launch();

    console.log(os.hostname());

    // bot.on()

    return bot;
}