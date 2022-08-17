import 'dotenv/config';

import { Telegraf } from 'telegraf';

const token = process.env.TELEGRAM_API_TOKEN;
const bot = new Telegraf(token);

export default async function getBot(setHook: boolean = false, hookUrl?: string) {
    const webhook = await bot.telegram.getWebhookInfo();

    if (setHook && hookUrl != null && (webhook?.url == null || webhook.url === '')) {
        console.log(`Setting webhook url ${hookUrl}`);
        await bot.telegram.setWebhook(hookUrl);
    }

    // bot.on()

    return bot;
}