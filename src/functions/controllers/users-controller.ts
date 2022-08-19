import getBot from "bot";
import db from "db";
import { DbCollection } from "db/types";
import { AdminChatId } from "utils/config";
import { ChatUser } from "utils/types";

export class UsersController {
    bot: ReturnType<typeof getBot>;

    constructor() {
        this.bot = getBot();
    }

    async addUpdatesReceiver(updatesReceiver: ChatUser) {
        const added = await db.add(DbCollection.UpdatesReceivers, updatesReceiver.id, updatesReceiver);
        if (added) {
            await this.bot.telegram.sendMessage(AdminChatId, `Користувач ${updatesReceiver.first_name} ${updatesReceiver.last_name}, ID:${updatesReceiver.id} хоче приєднатися до боту!`);
            await this.bot.telegram.sendMessage(updatesReceiver.id, `Привіт, ;${updatesReceiver.first_name || 'користувач'}! Вітаю Вас з початком користування ботом для отримання знижок!`);
        } else {
            await this.bot.telegram.sendMessage(AdminChatId, `Користувач ID:${updatesReceiver.id} вже приєднаний до боту!`);
            await this.bot.telegram.sendMessage(updatesReceiver.id, 'Ви вже зареєстровані!');
        }
    }

    async sendStartGreeting(chatUser: ChatUser) {
        await this.bot.telegram.sendMessage(chatUser.id, `
        Привіт, ;${chatUser.first_name || 'користувач'}! 
        Вітаю Вас у боті, в якому Ви можете отримувати останні знижки з магазину NAM!`);
    }
}