import { i18n } from 'i18next';
import { Context, Telegraf } from 'telegraf';

import { TelegramToken } from 'utils/config';
import { getI18Next } from 'utils/translaction';
import BotCommands from './commands';

const bot = new Telegraf(TelegramToken);

export interface ExtendedContext extends Context {
    i18: i18n;
}

bot.use(async (ctx: ExtendedContext, next) => {
    console.log("Running telegraf middleware!");
    const i18 = await getI18Next(ctx);
    ctx.i18 = i18;
    await next();
});

for (const bc of BotCommands) {
    bot.command(bc.command, bc.handler);
}

export default function getBot() {
    return bot;
};