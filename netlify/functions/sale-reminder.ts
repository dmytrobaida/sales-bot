import 'dotenv/config';

import { Handler } from "@netlify/functions";

import { getTotalSales } from '../../store-parsers/index.js';
import getBot from '../../bot/index.js';
import { sendSaleUpdates } from '../../bot/utils.js';

const newsReceivers = process.env.NEWS_RECEIVERS?.split(' ');

export const handler: Handler = async (event, context) => {
    try {
        console.log("------Start sending sale update!------");
        
        const bot = await getBot();
        const sales = await getTotalSales();

        await sendSaleUpdates(bot, newsReceivers, sales);

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