import { Telegram } from "telegraf";
import { InputMediaPhoto } from "telegraf/typings/core/types/typegram";

import { BotMenuCommands } from "./constants";

type SetupBotOptions = {
    hookUrl?: string;
    menuCommands?: typeof BotMenuCommands;
};

type SendMediaWithCaptionOptions = {
    chatIds: string[];
    media: InputMediaPhoto[];
    caption: string;
}

export async function sendMediaWithCaption(bot: Telegram, options: SendMediaWithCaptionOptions) {
    console.log(`Chat ids to receive media: ${JSON.stringify(options.chatIds)}`);
    console.log(`Media: ${JSON.stringify(options.media)}`);

    const promises = options.chatIds.map(chatId => (async () => {
        console.log(`Sending media with caption to: ${chatId}`);

        const message = await bot.sendMessage(chatId, options.caption);

        for (let i = 0; i < options.media.length; i += 10) {
            await bot.sendMediaGroup(chatId, options.media.slice(i, i + 10), {
                reply_to_message_id: message.message_id,
            });
        }

        console.log(`Completed sending media with caption to: ${chatId}`);
    })());

    await Promise.all(promises);
}

export async function setupBot(bot: Telegram, options?: SetupBotOptions) {
    const webhook = await bot.getWebhookInfo();

    if (options?.hookUrl != null && (webhook?.url == null || webhook.url === '')) {
        console.log(`Setting webhook url ${options.hookUrl}`);
        await bot.setWebhook(options.hookUrl);
    }

    if (options?.menuCommands != null) {
        await bot.setMyCommands(options.menuCommands);
    }
} 