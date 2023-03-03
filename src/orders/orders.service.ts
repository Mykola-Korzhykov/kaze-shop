import { HttpStatus, Injectable, Logger, Scope } from '@nestjs/common';
import crypto, { createCipheriv, randomBytes, scrypt } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { CART_EMPTY } from '../cart/cart.constants';
import { ApiException } from '../common/exceptions/api.exception';
import { CartService } from '../cart/cart.service';
import { TelegramService } from '../telegram/telegram.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { v4 } from 'uuid';
import { promisify } from 'util';
import { ContinueOrderDto } from './dto/continue.order.dto';
import { User } from '../users/models/user.model';
import { ORDER_NOT_FOUND, ORDER_TOKEN_NOT_PROVIDED } from './order.constants';
import { OrderProduct } from './models/order.product.model';
@Injectable({ scope: Scope.TRANSIENT })
export class OrdersService {
  private readonly Logger = new Logger(OrdersService.name);
  private readonly API_URL = `${process.env.LIQPAY_API_BASE_URL.trim()}/${Number(
    process.env.LIQPAY_API_VERSION,
  )}`;
  constructor(
    @InjectModel(Order) private readonly orderRepository: typeof Order,
    private readonly bot: TelegramService,
    private readonly cartService: CartService,
  ) {}

  async createOrder(
    request: Request,
    response: Response,
    next: NextFunction,
    cartId: number,
    createOrderDto: CreateOrderDto,
  ) {
    try {
      const userCart = await this.cartService.getCartById(cartId);
      if (!userCart.cartProducts || userCart.cartProducts.length === 0) {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          'Bad request',
          CART_EMPTY,
        );
      }
      const order = await this.orderRepository.create({
        ...createOrderDto,
      });
      const orderToken = await this.generateEncryptedValue('USER', 16);
      order.setOrderToken(orderToken);
      order.setOrderTokenExpiration(new Date());
      order.cartId = userCart.id;
      order.$set('cart', userCart);
      userCart.$set('order', order);
      await order.save();
      await userCart.save();
      if (request['user']) {
        const user: User = request['user'];
        order.$set('user', user.id);
        order.userId = user.id;
        user.$add('orders', order);
        await user.save();
        await order.save();
      }
      response.cookie('orderToken', orderToken, {
        maxAge: 1000 * 60 * 60 * 24,
        path: '/',
        httpOnly: true,
        signed: true,
        domain: process.env.CLIENT_DOMAIN.toString().trim(),
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
      });
      return response.json({ orderId: order.id });
    } catch (err) {
      this.Logger.error(err);
      return next(err);
    }
  }

  async continueOrder(
    request: Request,
    response: Response,
    next: NextFunction,
    continueOrderDto: ContinueOrderDto,
    languageCode = 'en',
  ) {
    try {
      const orderToken = request.signedCookies['orderToken'];
      if (!orderToken) {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          'Bad request!',
          ORDER_TOKEN_NOT_PROVIDED,
        );
      }
      const order = await this.orderRepository.findOne({
        where: { orderToken: orderToken },
        include: { all: true },
      });
      if (!order) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          ORDER_NOT_FOUND,
        );
      }
      let paymentLink: string = null;
      let totalPrice: number;
      const currency: {
        countryCode: string;
        currencyCode: string;
        symbol: string;
        rate: number;
      } = request['currency'];
      order.city = continueOrderDto.city;
      order.country = continueOrderDto.country;
      order.postOffice = continueOrderDto.postOffice;
      order.setCurrency(currency);
      order.languageCode = languageCode;
      if (continueOrderDto.comment) {
        order.comment = continueOrderDto.comment;
      }
      if (continueOrderDto.sendDate) {
        order.sendDate = continueOrderDto.sendDate;
      }
      for (const cartProduct of order.cart.cartProducts) {
        order.$add('orderProducts', cartProduct);
      }
      order.orderProducts.forEach((orderProduct: OrderProduct) => {
        totalPrice +=
          Number(orderProduct.quantity) * Number(orderProduct.price);
      });
      order.totalPrice = totalPrice * currency.rate;
      await order.save();
      if (continueOrderDto.payByCard && !continueOrderDto.payInCash) {
        paymentLink = this.ganeratePaymentLink(
          {
            userName: order.userName,
            userSurname: order.userSurname,
            amount: order.totalPrice,
            orderId: order.id,
            description: '',
            orderProducts: order.orderProducts,
            languageCode: languageCode,
          },
          currency,
        );
        return response.json({ paymentLink: paymentLink, orderId: order.id });
      }
      // відправка на бота і на крмку
      await this.bot.sendMessage(order);
      return response.json({ paymentLink: paymentLink, orderId: order.id });
    } catch (err) {
      this.Logger.error(err);
      return next(err);
    }
  }

  async verifyOrder(data: string, signature: string) {
    const parsedData = this.parseDataString(data);
    const order = await this.orderRepository.findByPk(parsedData.order_id, {
      include: { all: true },
    });
    const dataToSign = this.generateDataToSign(
      {
        userName: order.userName,
        userSurname: order.userSurname,
        amount: order.totalPrice,
        orderId: order.id,
        description: '',
        orderProducts: order.orderProducts,
        languageCode: order.languageCode,
      },
      order.getCurrency(),
    );
    const dataString = this.objectToBase64(dataToSign);
    const verification = this.verifyDataString(dataString, signature);
    if (verification) {
      await this.bot.sendMessage(order);
    }
    return;
  }

  private ganeratePaymentLink(
    params: {
      userName: string;
      userSurname: string;
      amount: number;
      orderId: number;
      description: string;
      orderProducts: OrderProduct[];
      languageCode: string;
    },
    currency: {
      countryCode: string;
      currencyCode: string;
      symbol: string;
      rate: number;
    },
  ): string {
    const dataToSign = this.generateDataToSign(params, currency);
    const dataString = this.objectToBase64(dataToSign);
    const signature = this.signString(dataString);
    return `${this.API_URL}/checkout?data=${dataString}&signature=${signature}`;
  }

  private generateDataToSign(
    params: {
      userName: string;
      userSurname: string;
      amount: number;
      orderId: number;
      description: string;
      orderProducts: OrderProduct[];
      languageCode: string;
    },
    currency: {
      countryCode: string;
      currencyCode: string;
      symbol: string;
      rate: number;
    },
  ) {
    const dataToSign = {
      version: Number(process.env.LIQPAY_API_VERSION),
      action: 'pay',
      sender_first_name: params.userName,
      sender_last_name: params.userSurname,
      sender_country_code: currency.countryCode,
      amount: params.amount,
      order_id: params.orderId,
      description: params.description.slice(0, 150), // Max length 150 symbols
      currency: currency.currencyCode,
      public_key: process.env.LIQPAY_PUBLIC_KEY.trim(),
      private_key: process.env.LIQPAY_PRIVATE_KEY.trim(),
      sandbox: false,
      language: params.languageCode,
      server_url: process.env.API_URL.trim(),
      result_url: `${process.env.REDIRECT_URL.trim()}?orderId=${
        params.orderId
      }`,
      rro_info: {
        items: params.orderProducts.map((orderProduct: OrderProduct) => {
          return {
            amount: orderProduct.quantity,
            price: orderProduct.price * currency.rate,
            cost: orderProduct.price * currency.rate * orderProduct.quantity,
            id: orderProduct.id,
          };
        }),
      },
    };
    return dataToSign;
  }

  private signString(strToSign: string): string {
    const hash = crypto.createHash('sha1');
    hash.update(
      process.env.LIQPAY_PRIVATE_KEY.trim() +
        strToSign +
        process.env.LIQPAY_PRIVATE_KEY.trim(),
    );
    return hash.digest('base64');
  }

  private objectToBase64(data: any): string {
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }

  private parseDataString(dataString: string) {
    return JSON.parse(Buffer.from(dataString, 'base64').toString('utf-8'));
  }

  private verifyDataString(dataString: string, signature: string): boolean {
    return crypto.timingSafeEqual(
      Buffer.from(this.signString(dataString)),
      Buffer.from(signature),
    );
  }

  private async generateEncryptedValue(
    value: string,
    bytes: number,
  ): Promise<string> {
    const iv = randomBytes(bytes);
    const API_KEY = process.env.API_KEY.toString();
    const key = (await promisify(scrypt)(API_KEY, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    return Buffer.concat([cipher.update(value), cipher.final()])
      .toString('base64')
      .replace('/', `${v4()}`)
      .replace('=', `${v4()}`);
  }
}
