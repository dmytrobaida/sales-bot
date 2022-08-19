import 'dotenv/config';

export const TelegramToken = process.env.TELEGRAM_API_TOKEN;
export const AdminChatId = process.env.ADMIN_CHAT_ID;
export const FaunaDbsecret = process.env.FAUNA_DB_SECRET;
export const NewsReceivers = process.env.NEWS_RECEIVERS?.split(' ');

