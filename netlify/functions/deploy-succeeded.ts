import { Handler } from "@netlify/functions";
import { BotController } from "controllers";

const botRunnerFunctionName = "bot-runner";

export const handler: Handler = async (event, context) => {
    try {
        console.log(event);
        console.log(context);

        const deployPayload = JSON.parse(event.body).payload;
        console.log(deployPayload);

        const siteUrl = deployPayload.site.url;
        console.log(siteUrl);
        const hookUrl = `${siteUrl}/.netlify/functions/${botRunnerFunctionName}`;
        console.log(hookUrl);

        await new BotController().initializeBot(hookUrl);

        return {
            statusCode: 200,
        };
    }
    catch (err) {
        console.log("------Error when executing function!------");
        console.log(err.toString());

        return {
            statusCode: 500,
            body: err.toString(),
        };
    }
}