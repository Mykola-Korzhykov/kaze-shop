import { Injectable, Scope } from '@nestjs/common';
import crypto from 'crypto';
import { TelegramService } from '../telegram/telegram.service';
@Injectable({ scope: Scope.TRANSIENT })
export class OrdersService {
  private readonly API_URL = `${process.env.LIQPAY_API_BASE_URL.trim()}/${Number(
    process.env.LIQPAY_API_VERSION,
  )}`;
  constructor(private readonly bot: TelegramService) {}
  ganeratePaymentLink(params: {
    amount: number;
    orderId: number;
    description: string;
    defaultCurrency: string;
  }) {
    const dataToSign = {
      version: Number(process.env.LIQPAY_API_VERSION),
      action: 'pay',
      amount: params.amount,
      order_id: params.orderId,
      description: params.description.slice(0, 150), // Max length 150 symbols
      currency: params.defaultCurrency,
      public_key: process.env.LIQPAY_PRIVATE_KEY.trim(),
      sandbox: false,
      //server_url: this.callbackUrl,
      //result_url: `${this.redirectUrl}?orderId=${params.orderId}`,
    };
    const dataString = this.objectToBase64(dataToSign);
    const signature = this.signString(dataString);
    return `${this.API_URL}/checkout?data=${dataString}&signature=${signature}`;
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

  private objectToBase64(data: any) {
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
}

// import crypto from 'crypto';

// const API_VERSION = 3;
// const API_BASE_URL = `https://www.liqpay.ua/api/${API_VERSION}`;

// class LiqPay {
//   constructor({
//     publicKey,
//     privateKey,
//     sandboxMode = false,
//     callbackUrl,
//     redirectUrl,
//     defaultCurrency = 'UAH',
//   }) {
//     this._publicKey = publicKey;
//     this._privateKey = privateKey;
//     this.defaultCurrency = defaultCurrency;
//     this.sandboxMode = sandboxMode;
//     this.callbackUrl = callbackUrl;
//     this.redirectUrl = redirectUrl;
//   }

//   /**
//    * @method
//    * @param {LiqpayPaymentData} params
//    * @return {string}
//    * */
//   generatePaymentLink(params) {
//     const dataToSign = {
//       version: API_VERSION,
//       action: 'pay',
//       amount: params.amount,
//       order_id: params.orderId,
//       description: params.description.slice(0, 150), // Max length 150 symbols
//       currency: this.defaultCurrency,
//       public_key: this._publicKey,
//       sandbox: this.sandboxMode,
//       server_url: this.callbackUrl,
//       result_url: `${this.redirectUrl}?orderId=${params.orderId}`,
//     };
//     const dataString = this.objectToBase64(dataToSign);
//     const signature = this.signString(dataString);

//     return `${API_BASE_URL}/checkout?data=${dataString}&signature=${signature}`;
//   }

//   /**
//    * @method
//    * @param {string} strToSign
//    * @return {string} base64 encoded and signed string
//    * */
//   signString(strToSign) {
//     const hash = crypto.createHash('sha1');
//     hash.update(this._privateKey + strToSign + this._privateKey);
//     return hash.digest('base64');
//   }

//   /**
//    * @method
//    * @param {Object} data
//    * @return {string}
//    * */
//   objectToBase64(data) {
//     return Buffer.from(JSON.stringify(data)).toString('base64');
//   }

//   /**
//    * @method
//    * @desc Parse dataString to plain object
//    * @param {string} dataString
//    * @return {Object}
//    * */
//   parseDataString(dataString) {
//     return JSON.parse(Buffer.from(dataString, 'base64').toString('utf-8'));
//   }

//   /**
//    * @method
//    * @desc Ensure that dataString is same signature as provided
//    * @param {string} dataString
//    * @param {string} signature
//    * @return boolean
//    * */
//   verifyDataString(dataString, signature) {
//     return crypto.timingSafeEqual(
//       Buffer.from(this.signString(dataString)),
//       Buffer.from(signature),
//     );
//   }
// }

// /**
//  * @typedef {Object} LiqpayPaymentData
//  * @property {number} amount - price
//  * @property {string} description
//  * @property {string} orderId
//  *
//  * */

// /**
//  * @typedef {Object} LiqpayCallbackData
//  * @property {number}  payment_id - xxxxx
//  * @property {string}  action - 'pay'
//  * @property {string}  status - 'sandbox'
//  * @property {number}  version - 3
//  * @property {string}  type - 'buy'
//  * @property {string}  paytype - 'card'
//  * @property {string}  public_key - 'sandbox_i2xxxxx
//  * @property {number}  acq_id - 414963
//  * @property {string}  order_id - '1625059424707'
//  * @property {string}  liqpay_order_id - 'xxxx'
//  * @property {string}  description - 'test'
//  * @property {string}  sender_card_mask2 - '424242*42'
//  * @property {string}  sender_card_bank - 'Test'
//  * @property {string}  sender_card_type - 'visa'
//  * @property {number}  sender_card_country - 804
//  * @property {string}  ip - '18.195.9.246'
//  * @property {number}  amount - 10.0
//  * @property {string}  currency - 'UAH'
//  * @property {number}  sender_commission - 0.0
//  * @property {number}  receiver_commission - 0.28
//  * @property {number}  agent_commission - 0.0
//  * @property {number}  amount_debit - 10.0
//  * @property {number}  amount_credit - 10.0
//  * @property {number}  commission_debit - 0.0
//  * @property {number}  commission_credit - 0.28
//  * @property {string}  currency_debit - 'UAH'
//  * @property {string}  currency_credit - 'UAH'
//  * @property {number}  sender_bonus - 0.0
//  * @property {number}  amount_bonus - 0.0
//  * @property {string}  mpi_eci - '7'
//  * @property {string}  is_3ds - false
//  * @property {string}  language - 'en'
//  * @property {number}  create_date - 1625059441022
//  * @property {number}  end_date - 1625059441062
//  * @property {number}  transaction_id - xxxx
//  * @property {string}  err_code
//  * @property {string}  err_description
//  * */

// module.exports = { LiqPay: LiqPay, API_VERSION, API_BASE_URL };
