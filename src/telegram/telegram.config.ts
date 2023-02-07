import { ITelegramOptions } from '../telegram/telegram.interface';

export const getTelegramConfig = (): ITelegramOptions => {
  const token = process.env.TG_TOKEN.trim();
  if (!token) {
    throw new Error('TELEGRAM_TOKEN not provided!');
  }
  return {
    token,
    chatId: process.env.TG_CHAT_ID.trim() ?? '',
  };
};
