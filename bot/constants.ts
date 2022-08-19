import { BotCommand } from "telegraf/typings/core/types/typegram";

import { BotMenuCommand } from "./types";

export const BotMenuCommands: BotCommand[] = [{
    command: BotMenuCommand.register,
    description: 'Реєстрація'
}, {
    command: BotMenuCommand.getSales,
    description: 'Отримати знижки'
}];