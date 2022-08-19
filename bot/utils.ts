import { Telegraf } from "telegraf";
import { InputMediaPhoto } from "telegraf/typings/core/types/typegram";

import { getTotalSales } from "store-parsers";

export async function sendSaleUpdates(bot: Telegraf, newsReceivers: string[]) {
    console.log(`News receivers: ${JSON.stringify(newsReceivers)}`);
    if (newsReceivers == null) {
        return;
    }

    const sales = await getTotalSales();

    console.log(`Sales: ${JSON.stringify(sales)}`);

    let saleMessage = "Привіт! Лови знижки NAM:)";

    // sales.forEach(sl => {
    //     saleMessage += `\n${sl.productName}, ${sl.discount}, ${sl.salePrice}`;
    // })

    const promises = newsReceivers.map(receiver => (async () => {
        console.log(`Sending update to: ${receiver}`);

        const message = await bot.telegram.sendMessage(receiver, saleMessage);
        const media: InputMediaPhoto[] = sales.map(sl => ({
            type: 'photo',
            media: sl.productImage,
            caption: `Назва: ${sl.productName}\nЗнижка: ${sl.discount}\nЦіна без знижки: ${sl.regularPrice}\nЦіна зі знижкою: ${sl.salePrice}\nПосилання: ${sl.productLink}`,
        }));

        for (let i = 0; i < media.length; i += 10) {
            await bot.telegram.sendMediaGroup(receiver, media.slice(i, i + 10), {
                reply_to_message_id: message.message_id,
            });
        }

        console.log(`Completed sending update to: ${receiver}`);
    })());

    await Promise.all(promises);
}