import { Handler } from "@netlify/functions";

import getBot from 'bot';
import { sendSaleUpdates } from 'bot/utils';
import { NewsReceivers } from "utils/config";


export const handler: Handler = async (event, context) => {
    try {
        console.log("------Start sending sale update!------");
        
        const bot = await getBot();

        await sendSaleUpdates(bot, NewsReceivers);

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