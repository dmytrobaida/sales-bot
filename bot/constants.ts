import { BotCommand } from "telegraf/typings/core/types/typegram";

import { CTCommand } from "./types";

export const BotCommands: BotCommand[] = [{
    command: CTCommand.register,
    description: 'Реєстрація'
}, {
    command: CTCommand.getSales,
    description: 'Отримати знижки'
}];