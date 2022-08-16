import 'dotenv/config';

import { Handler } from "@netlify/functions";
import TelegramBot, { InputMediaPhoto } from "node-telegram-bot-api";
import { parseNam } from './nam-parser.js';

const token = process.env.TELEGRAM_API_TOKEN;
const adminChatId = process.env.ADMIN_CHAT_ID;
const newsReceivers = process.env.NEWS_RECEIVERS?.split(' ');

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/register/, (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
    bot.sendMessage(adminChatId, `Користувач ID:${chatId} хоче приєднатися до боту!`);
});

async function sendSalesNews() {
    if (newsReceivers == null) {
        return;
    }

    const sales = await parseNam();

    newsReceivers.forEach(async receiver => {
        await bot.sendMessage(receiver, `Привіт! Лови знижки NAM:)`);

        const media: InputMediaPhoto[] = sales.map(sl => ({
            type: 'photo',
            media: sl.productImage,
            caption: `Назва: ${sl.productName}\nЗнижка: ${sl.discount}\nЦіна без знижки: ${sl.regularPrice}\nЦіна зі знижкою: ${sl.salePrice}\nПосилання: ${sl.productLink}`,
        }));

        await bot.sendMediaGroup(receiver, media);
    });
}

export const handler: Handler = async (event, context) => {
    await sendSalesNews();
    return {
        statusCode: 200,
    };
};

sendSalesNews();