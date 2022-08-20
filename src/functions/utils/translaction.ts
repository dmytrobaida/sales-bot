import i18next from "i18next";
import { Context } from "telegraf";

import en from 'assets/translations/en.json';
import ua from 'assets/translations/ua.json';

export async function getI18Next(context: Context) {
    await i18next
        .use({
            type: 'languageDetector',
            detect: () => {
                const languageCode = context.from.language_code || 'ua';
                console.log(`Detected chat language: ${languageCode}`);
                return languageCode;
            }
        })
        .init({
            lng: 'en',
            debug: true,
            resources: {
                en: {
                    translation: en,
                },
                ua: {
                    translation: ua,
                }
            }
        });

    return i18next;
}