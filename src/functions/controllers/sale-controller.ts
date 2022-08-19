import { InputMediaPhoto } from "telegraf/typings/core/types/typegram";

import { getTotalSales } from "store-parsers";
import { NewsReceivers } from "utils/config";
import { sendMediaWithCaption } from "bot/utils";
import getBot from "bot";

export class SaleController {
    bot: ReturnType<typeof getBot>;

    constructor() {
        this.bot = getBot();
    }

    async sendSaleUpdates(receivers: string[] = null) {
        if (receivers == null) {
            receivers = NewsReceivers;
        }

        const sales = await getTotalSales();

        const media: InputMediaPhoto[] = sales.map(sl => ({
            type: 'photo',
            media: sl.productImage,
            caption: `
                Назва: ${sl.productName}\n
                Знижка: ${sl.discount}\n
                Ціна без знижки: ${sl.regularPrice}\n
                Ціна зі знижкою: ${sl.salePrice}\n
                Посилання: ${sl.productLink}
            `,
        }));

        await sendMediaWithCaption(this.bot.telegram, {
            chatIds: receivers,
            caption: "Привіт! Лови останні знижки NAM:)",
            media: media,
        })
    }
}