import getBot from "bot";
import db from "db";
import { DbCollection } from "db/types";
import { AdminChatId } from "utils/config";

type UpdatesReceiver = {
    id: number;
    first_name?: string;
    last_name?: string;
}

export class UsersController {
    bot: ReturnType<typeof getBot>;

    constructor() {
        this.bot = getBot();
    }

    async addUpdatesReceiver(updatesReceiver: UpdatesReceiver) {
        const added = await db.add(DbCollection.UpdatesReceivers, updatesReceiver.id, updatesReceiver);
        if (added) {
            await this.bot.telegram.sendMessage(AdminChatId, `Користувач ID:${updatesReceiver.id} хоче приєднатися до боту!`);
        } else {
            await this.bot.telegram.sendMessage(AdminChatId, `Користувач ID:${updatesReceiver.id} вже приєднаний до боту!`);
        }
    }
}