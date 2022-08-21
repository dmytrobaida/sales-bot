import i18next, { i18n, Resource, ResourceLanguage } from "i18next";
import { Context } from "telegraf";

import en from 'assets/translations/en.json';
import uk from 'assets/translations/uk.json';

type Lang = 'en' | 'uk';

const DefaultLang: Lang = 'en';
const Languages: Record<Lang, ResourceLanguage> = {
    en: en,
    uk: uk,
};

let i18nInstance: i18n = null;

export async function getI18Next() {
    if (i18nInstance == null) {
        await i18next
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
        i18nInstance = i18next;
    }

    return i18nInstance;
}