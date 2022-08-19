import { Handler } from "@netlify/functions";
import { BotController } from "controllers";

const botRunnerFunctionName = "bot-runner";

export const handler: Handler = async (event, context) => {
    try {
        console.log("------Executing deploy succeeded function!------");

        const deployPayload = JSON.parse(event.body)?.payload;
        const siteUrl = deployPayload?.ssl_url;

        if (siteUrl != null) {
            const hookUrl = `${siteUrl}/.netlify/functions/${botRunnerFunctionName}`;
            await new BotController().initializeBot(hookUrl);
        }

        return {
            statusCode: 200,
        };
    }
    catch (err) {
        console.log("------Error when executing deploy succeeded function!------");
        console.log(err.toString());

        return {
            statusCode: 500,
            body: err.toString(),
        };
    }
}