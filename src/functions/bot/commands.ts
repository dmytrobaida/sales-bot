import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { BotMenuCommand } from "./types";
import { SaleController, UsersController } from "controllers";

type BotCommand = {
    command: BotMenuCommand;
    handler: (ctx: Context<Update>) => Promise<any>;
}

const BotCommands: BotCommand[] = [
    {
        command: BotMenuCommand.start,
        handler: async ctx => {
            console.log(ctx.message);
            await new UsersController().sendStartGreeting(ctx.from);
        }
    },
    {
        command: BotMenuCommand.register,
        handler: async ctx => {
            console.log(ctx.message);
            await new UsersController().addUpdatesReceiver(ctx.from);
        }
    },
    {
        command: BotMenuCommand.getSales,
        handler: async ctx => {
            console.log(ctx.message);
            await new SaleController().sendSaleUpdates([ctx.chat.id.toString()]);
        }
    },
];

export default BotCommands;