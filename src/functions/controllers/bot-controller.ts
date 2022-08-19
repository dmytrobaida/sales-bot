import getBot from "bot";
import { BotMenuCommands } from "bot/constants";
import { setupBot } from "bot/utils";

export class BotController {
    bot: ReturnType<typeof getBot>;

    constructor() {
        this.bot = getBot()
    }

    async initializeBot(hookUrl: string) {
        console.log(`Initializing bot with hook url: ${hookUrl}`);

        await setupBot(this.bot.telegram, {
            hookUrl,
            menuCommands: BotMenuCommands,
        });
    }
}