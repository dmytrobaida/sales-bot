import 'dotenv/config';

import { Handler } from "@netlify/functions";
import TelegramBot, { InputMediaPhoto } from "node-telegram-bot-api";
import { parseNam } from './utils/nam-parser.js';

const token = process.env.TELEGRAM_API_TOKEN;
const adminChatId = process.env.ADMIN_CHAT_ID;
const newsReceivers = process.env.NEWS_RECEIVERS?.split(' ');

const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/register/, (msg) => {
//     const chatId = msg.chat.id;
//     console.log(msg);
//     bot.sendMessage(adminChatId, `Користувач ID:${chatId} хоче приєднатися до боту!`);
// });

async function sendSalesNews() {
    console.log(`News receivers: ${JSON.stringify(newsReceivers)}`);
    if (newsReceivers == null) {
        return;
    }

    const sales = await parseNam();
    console.log(`Sales: ${JSON.stringify(sales)}`);

    newsReceivers.forEach(async receiver => {
        console.log(`Sending update to: ${receiver}`);

        const message = await bot.sendMessage(receiver, `Привіт! Лови знижки NAM:)`);

        const media: InputMediaPhoto[] = sales.map(sl => ({
            type: 'photo',
            media: sl.productImage,
            caption: `Назва: ${sl.productName}\nЗнижка: ${sl.discount}\nЦіна без знижки: ${sl.regularPrice}\nЦіна зі знижкою: ${sl.salePrice}\nПосилання: ${sl.productLink}`,
        }));

        for (let i = 0; i < media.length; i += 10) {
            await bot.sendMediaGroup(receiver, media.slice(i, i + 10));
        }

        console.log(`Completed sending update to: ${receiver}`);
    });
}

const handler: Handler = async (event, context) => {
    console.log("------Start sending sale update!------");
    await sendSalesNews();
    console.log("------Completed sending sale update!------");
    return {
        statusCode: 200,
    };
};

sendSalesNews();

export { handler };