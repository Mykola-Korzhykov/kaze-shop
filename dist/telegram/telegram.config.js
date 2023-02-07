"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTelegramConfig = void 0;
const getTelegramConfig = () => {
    var _a;
    const token = process.env.TG_TOKEN.trim();
    if (!token) {
        throw new Error('TELEGRAM_TOKEN not provided!');
    }
    return {
        token,
        chatId: (_a = process.env.TG_CHAT_ID.trim()) !== null && _a !== void 0 ? _a : '',
    };
};
exports.getTelegramConfig = getTelegramConfig;
//# sourceMappingURL=telegram.config.js.map