import { Telegraf } from 'telegraf';

import { TelegramToken } from 'utils/config';
import BotCommands from './commands';

const bot = new Telegraf(TelegramToken);

for (const bc of BotCommands) {
    bot.command(bc.command, bc.handler);
}

export default function getBot() {
    return bot;
}