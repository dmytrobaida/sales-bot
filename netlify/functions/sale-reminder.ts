import 'dotenv/config';

import { Handler } from "@netlify/functions";

import { getTotalSales } from '../../store-parsers/index.js';
import getBot from '../../bot/index.js';
import { sendSaleUpdates } from '../../bot/utils.js';

const newsReceivers = process.env.NEWS_RECEIVERS?.split(' ');

// bot.onText(/\/register/, (msg) => {
//     const chatId = msg.chat.id;
//     console.log(msg);
//     bot.sendMessage(adminChatId, `Користувач ID:${chatId} хоче приєднатися до боту!`);
// });

export const handler: Handler = async (event, context) => {
    try {
        console.log("------Start sending sale update!------");
        const bot = getBot();
        const sales = await getTotalSales();

        await sendSaleUpdates(bot, newsReceivers, sales);

        return {
            statusCode: 200,
        };
    }
    catch (err) {
        console.log("------Error when sending sale update!------");
        console.log(JSON.stringify(err));

        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
};