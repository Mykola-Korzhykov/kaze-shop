import { Inject, Injectable, Scope } from '@nestjs/common';
import { Order } from '../orders/models/order.model';
import { Telegraf } from 'telegraf';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { ITelegramOptions } from './telegram.interface';
import { OrderProduct } from '../orders/models/order.product.model';

@Injectable({ scope: Scope.TRANSIENT })
export class TelegramService {
  bot: Telegraf;
  options: ITelegramOptions;

  constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions) {
    this.bot = new Telegraf(options.token);
    this.options = options;
  }

  async sendMessage(order: Order, chatId: string = this.options.chatId) {
    const message = this.createMessage(order);
    const msg = await this.bot.telegram.sendMessage(chatId, message);
    return msg;
  }

  private createMessage(order: Order) {
    let message = ``;
    let totalPrice = 0;
    order.orderProducts.forEach((orderProduct: OrderProduct, index: number) => {
      message += `
      - - - - - - - - -   
      ТОВАР ${index + 1}
      Товар: ${orderProduct}
      Размер: ${orderProduct.size}
      Цвет: ${orderProduct.colour.ru}, ${orderProduct.colour.hex}
      Колличество: ${orderProduct.quantity}
      Цена: ${orderProduct.price}$

      `;
    });
    order.orderProducts.forEach((orderProduct: OrderProduct) => {
      totalPrice += Number(orderProduct.quantity) * Number(orderProduct.price);
    });
    message += `
    - - - - - - - - -
    КОНТАКТНАЯ ИНФОРМАЦИЯ

    Имя: ${order.userName}
    Фамилия: ${order.userSurname}
    Номер телефона: ${order.userPhoneNumber}
    E-mail: ${order.userEmail}
    
    - - - - - - - - -

    ДОСТАВКА В ОТДЕЛЕНИЕ

    Страна: ${order.country}
    Город: ${order.city}
    Отделение: ${order.postOffice}

    - - - - - - - - -

    ОПЛАТА КАРТОЙ

    Статус оплаты: ${
      order.getOrderStatus() === 'PAID' ? 'Оплачено' : 'Не оплачено'
    }
    Комментарий к заказу: ${order.comment ? order.comment : 'Отсутствует'}

    - - - - - - - - -

    ПОДИТОГ

    Сумма заказа: ${totalPrice}$`;

    return message;
  }
}
