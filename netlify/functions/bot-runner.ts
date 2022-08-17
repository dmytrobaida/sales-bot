import { Handler } from "@netlify/functions";

import getBot from '../../bot/index.js';

// bot.onText(/\/register/, (msg) => {
//     const chatId = msg.chat.id;
//     console.log(msg);
//     bot.sendMessage(adminChatId, `Користувач ID:${chatId} хоче приєднатися до боту!`);
// });

export const handler: Handler = async (event, context) => {
    try {
        console.log("------Handling webhook from telegram api!------");

        const bot = await getBot();

        if (event.body == null) {
            throw new Error("Body is empty!");
        }

        const message = JSON.parse(event.body);

        await bot.handleUpdate(message);

        console.log("------Completed handling webhook from telegram api!------");

        return {
            statusCode: 200,
        };
    }
    catch (err) {
        console.log("------Error when handling webhook from telegram api!------");
        console.log(err.toString());

        return {
            statusCode: 500,
            body: err.toString(),
        };
    }
};