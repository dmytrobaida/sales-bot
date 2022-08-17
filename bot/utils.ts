import { Telegraf } from "telegraf";
import { InputMediaPhoto } from "telegraf/typings/core/types/typegram";

import { SaleEntity } from "store-parsers/types";

export async function sendSaleUpdates(bot: Telegraf, newsReceivers: string[], sales: SaleEntity[]) {
    console.log(`News receivers: ${JSON.stringify(newsReceivers)}`);
    if (newsReceivers == null) {
        return;
    }

    console.log(`Sales: ${JSON.stringify(sales)}`);

    newsReceivers.forEach(async receiver => {
        console.log(`Sending update to: ${receiver}`);

        const message = await bot.telegram.sendMessage(receiver, `Привіт! Лови знижки NAM:)`);
        const media: InputMediaPhoto[] = sales.map(sl => ({
            type: 'photo',
            media: sl.productImage,
            caption: `Назва: ${sl.productName}\nЗнижка: ${sl.discount}\nЦіна без знижки: ${sl.regularPrice}\nЦіна зі знижкою: ${sl.salePrice}\nПосилання: ${sl.productLink}`,
        }));

        for (let i = 0; i < media.length; i += 10) {
            await bot.telegram.sendMediaGroup(receiver, media.slice(i, i + 10));
        }

        console.log(`Completed sending update to: ${receiver}`);
    });
}