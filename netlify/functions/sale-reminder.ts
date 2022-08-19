import 'dotenv/config';

import { Handler } from "@netlify/functions";

import getBot from 'bot';
import { sendSaleUpdates } from 'bot/utils';

const newsReceivers = process.env.NEWS_RECEIVERS?.split(' ');

export const handler: Handler = async (event, context) => {
    try {
        console.log("------Start sending sale update!------");
        
        const bot = await getBot();

        await sendSaleUpdates(bot, newsReceivers);

        return {
            statusCode: 200,
        };
    }
    catch (err) {
        console.log("------Error when sending sale update!------");
        console.log(err.toString());

        return {
            statusCode: 500,
            body: err.toString(),
        };
    }
};