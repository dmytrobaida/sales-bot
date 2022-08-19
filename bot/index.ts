import { Telegraf } from 'telegraf';

import { BotMenuCommands } from './constants';
import { TelegramToken } from 'utils/config';
import BotCommands from './commands';
import { setupBot } from './utils';

const bot = new Telegraf(TelegramToken);

for (const bc of BotCommands) {
    bot.command(bc.command, bc.handler);
}

export default function getBot(hookUrl?: string) {
    // TODO: Move to another place
    
    // await setupBot(bot.telegram, {
    //     hookUrl,
    //     menuCommands: BotMenuCommands,
    // });

    return bot;
}