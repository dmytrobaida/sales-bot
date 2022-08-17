import 'dotenv/config';

import { Telegraf } from 'telegraf';
import { BotCommand } from 'telegraf/typings/core/types/typegram';

import { sendSaleUpdates } from './utils.js';

const token = process.env.TELEGRAM_API_TOKEN;
const adminChatId = process.env.ADMIN_CHAT_ID;
const bot = new Telegraf(token);

enum CTCommand {
    getSales = 'getsales',
    register = 'register'
}

const botCommands: BotCommand[] = [{
    command: CTCommand.register,
    description: 'Реєстрація'
}, {
    command: CTCommand.getSales,
    description: 'Отримати знижки'
}];

export default async function getBot(setHook: boolean = false, hookUrl?: string) {
    const webhook = await bot.telegram.getWebhookInfo();

    if (setHook && hookUrl != null && (webhook?.url == null || webhook.url === '')) {
        console.log(`Setting webhook url ${hookUrl}`);
        await bot.telegram.setWebhook(hookUrl);
    }

    await bot.telegram.setMyCommands(botCommands);

    bot.command(CTCommand.register, async (ctx) => {
        console.log(ctx.message);
        await ctx.telegram.sendMessage(adminChatId, `Користувач ID:${ctx.chat.id} хоче приєднатися до боту!`);
    });

    bot.command(CTCommand.getSales, async (ctx) => {
        console.log(ctx.message);
        await sendSaleUpdates(bot, [ctx.chat.id.toString()]);
    });

    return bot;
}