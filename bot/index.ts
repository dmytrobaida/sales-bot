import { Telegraf } from 'telegraf';

import { sendSaleUpdates } from './utils';
import db from "./db";
import { BotCommands } from './constants';
import { CTCommand } from './types';
import { AdminChatId, TelegramToken } from 'utils/config';

const bot = new Telegraf(TelegramToken);

export default async function getBot(setHook: boolean = false, hookUrl?: string) {
    const webhook = await bot.telegram.getWebhookInfo();

    if (setHook && hookUrl != null && (webhook?.url == null || webhook.url === '')) {
        console.log(`Setting webhook url ${hookUrl}`);
        await bot.telegram.setWebhook(hookUrl);
    }

    await bot.telegram.setMyCommands(BotCommands);

    bot.command(CTCommand.register, async (ctx) => {
        console.log(ctx.message);
        const added = await db.add('news_receivers', ctx.chat.id, ctx.chat);
        if (added) {
            await ctx.telegram.sendMessage(AdminChatId, `Користувач ID:${ctx.chat.id} хоче приєднатися до боту!`);
        } else {
            await ctx.telegram.sendMessage(AdminChatId, `Користувач ID:${ctx.chat.id} вже приєднаний до боту!`);
        }
    });

    bot.command(CTCommand.getSales, async (ctx) => {
        console.log(ctx.message);
        await sendSaleUpdates(bot, [ctx.chat.id.toString()]);
    });

    return bot;
}