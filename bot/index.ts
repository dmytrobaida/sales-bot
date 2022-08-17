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

    bot.command('register', (ctx) => {
        console.log(ctx.message);
        ctx.reply(`Користувач ID:${ctx.chat.id} хоче приєднатися до боту!`)
    })

    return bot;
}