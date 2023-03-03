import { Inject, Injectable, Scope } from '@nestjs/common';
import { Order } from '../orders/models/order.model';
import { Telegraf } from 'telegraf';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { ITelegramOptions } from './telegram.interface';

@Injectable({ scope: Scope.TRANSIENT })
export class TelegramService {
  bot: Telegraf;
  options: ITelegramOptions;

  constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions) {
    this.bot = new Telegraf(options.token);
    this.options = options;
  }

  async sendMessage(order: Order, chatId: string = this.options.chatId) {
    //await this.bot.telegram.sendMessage(chatId);
  }

  private createMessage(order: Order) {}
}
