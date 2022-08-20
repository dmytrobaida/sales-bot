import i18next, { Resource, ResourceLanguage } from "i18next";
import { Context } from "telegraf";

import en from 'assets/translations/en.json';
import ua from 'assets/translations/ua.json';

type GetContextFn = () => Context;
type Lang = 'en' | 'ua';

const DefaultLang: Lang = 'en';
const Languages: Record<Lang, ResourceLanguage> = {
    en: en,
    ua: ua,
};

export async function getI18Next(getContext: GetContextFn) {
    await i18next
        .use({
            type: 'languageDetector',
            init: () => { },
            cacheUserLanguage: () => { },
            detect: () => {
                const context = getContext();
                const languageCode = context.from.language_code || DefaultLang;
                console.log(`Detected chat language: ${languageCode}`);
                return languageCode;
            }
        })
        .init({
            debug: true,
            fallbackLng: DefaultLang,
            resources: Object.keys(Languages).reduce((resources, lang: Lang) => {
                resources[lang] = {
                    translation: Languages[lang],
                };
                return resources;
            }, {} as Resource),
        });

    return i18next;
}