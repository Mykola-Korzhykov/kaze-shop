import { HttpStatus, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NextFunction, Request, Response } from 'express';
import { Admin } from '../admin/models/admin.model';
import { ApiException } from '../common/exceptions/api.exception';
import { Owner } from '../owner/models/owner.model';
import { CART_NOT_FOUND } from './cart.constants';
import { Cart } from './models/cart.model';
import { CartProduct } from './models/cart.product.model';
import { ProductService } from '../product/product.service';
import { User } from 'src/users/models/user.model';
import { randomBytes, scrypt, createCipheriv } from 'crypto';
import { promisify } from 'util';
import { v4 } from 'uuid';

@Injectable({ scope: Scope.TRANSIENT })
export class CartService {
  private readonly Logger = new Logger(CartService.name);
  constructor(
    @InjectModel(CartProduct)
    private readonly cartProductRepository: typeof CartProduct,
    @InjectModel(Cart) private readonly cartRepository: typeof Cart,
    private readonly productService: ProductService,
  ) {}

  async setCart(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.signedCookies['_id']) {
        const _id = await this.generateEncryptedValue('USER', 16);
        await this.createCart(_id);
        response.cookie('_id', _id, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production' ? true : false,
          domain: process.env.CLIENT_DOMAIN.toString().trim(),
          sameSite: 'strict',
          signed: true,
          path: '/',
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return response.json({ _id: _id });
      }
      response.cookie('_id', request.signedCookies['_id'], {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        domain: process.env.CLIENT_DOMAIN.toString().trim(),
        sameSite: 'strict',
        signed: true,
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return response.json({ _id: request.signedCookies['_id'] });
    } catch (error: unknown) {
      return next(error);
    }
  }

  async getCart(response: Response, request: Request, next: NextFunction) {
    try {
      const user: User | Admin | Owner | null = request['user'];
      const cartIdentifier = request.signedCookies['_id'];
      let cart: Cart = await this.findCartByIdentifier(cartIdentifier);
      if (user) {
        cart = user.cart;
      }
      const currency: {
        currencyCode: string;
        symbol: string;
        rate: number;
      } = request['currency'];
      let totalPrice = 0;
      cart.cartProducts.forEach((cartProduct: CartProduct) => {
        totalPrice +=
          Number(cartProduct.quantity) * Number(cartProduct.product.price);
      });
      return response.json({
        cart: {
          id: cart.id,
          cartStatus: cart.cartStatus,
          totalPrice: totalPrice * currency.rate + currency.symbol,
          cartProducts: cart.cartProducts.map((cartProduct: CartProduct) => {
            const product = cartProduct.getProduct();
            return {
              product: {
                id: product.id,
                title: product.getTitle(),
                description: product.getDescription(),
                price:
                  Math.round(product.price * currency.rate) + currency.symbol,
                quantity: product.quantity,
                images: product.images,
                hexes: product.hexes,
                sizeChartImage: product.sizeChartImage,
                sizes: product.sizes,
                colours: product.colours.map((colour) => {
                  return {
                    id: colour.id,
                    ua: colour.ua,
                    en: colour.en,
                    rs: colour.rs,
                    ru: colour.ru,
                    hex: colour.hex,
                    type: 'colour',
                    createdAt: colour.createdAt,
                    updatedAt: colour.updatedAt,
                  };
                }),
                categories: product?.categories?.map((category) => {
                  return {
                    id: category.id,
                    ua: category.ua,
                    en: category.en,
                    rs: category.rs,
                    ru: category.ru,
                    type: 'category',
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                  };
                }),
                reviews: product.reviews.map((review) => {
                  return {
                    id: review.id,
                    name: review.name,
                    surname: review.surname,
                    review: review.review,
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt,
                  };
                }),
              },
              quantity: cartProduct.quantity,
            };
          }),
        },
      });
    } catch (err: unknown) {
      this.Logger.error(err);
      return next(err);
    }
  }

  async getLeftCarts(
    response: Response,
    request: Request,
    next: NextFunction,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const user: User | Admin | Owner | null = request['user'];
      const leftCarts: Cart[] = user.leftCarts;
      const currency: {
        currencyCode: string;
        symbol: string;
        rate: number;
      } = request['currency'];
      return response.json({
        leftCarts: leftCarts.map((cart: Cart) => {
          let totalPrice = 0;
          cart.cartProducts.forEach((cartProduct: CartProduct) => {
            totalPrice +=
              Number(cartProduct.quantity) * Number(cartProduct.product.price);
          });
          return {
            id: cart.id,
            cartStatus: cart.cartStatus,
            totalPrice: totalPrice * currency.rate + currency.symbol,
            cartProducts: cart.cartProducts.map((cartProduct: CartProduct) => {
              const product = cartProduct.getProduct();
              return {
                product: {
                  id: product.id,
                  title: product.getTitle(),
                  description: product.getDescription(),
                  price:
                    Math.round(product.price * currency.rate) + currency.symbol,
                  quantity: product.quantity,
                  images: product.images,
                  hexes: product.hexes,
                  sizeChartImage: product.sizeChartImage,
                  sizes: product.sizes,
                  colours: product.colours.map((colour) => {
                    return {
                      id: colour.id,
                      ua: colour.ua,
                      en: colour.en,
                      rs: colour.rs,
                      ru: colour.ru,
                      hex: colour.hex,
                      type: 'colour',
                      createdAt: colour.createdAt,
                      updatedAt: colour.updatedAt,
                    };
                  }),
                  categories: product?.categories?.map((category) => {
                    return {
                      id: category.id,
                      ua: category.ua,
                      en: category.en,
                      rs: category.rs,
                      ru: category.ru,
                      type: 'category',
                      createdAt: category.createdAt,
                      updatedAt: category.updatedAt,
                    };
                  }),
                  reviews: product.reviews.map((review) => {
                    return {
                      id: review.id,
                      name: review.name,
                      surname: review.surname,
                      review: review.review,
                      createdAt: review.createdAt,
                      updatedAt: review.updatedAt,
                    };
                  }),
                },
                quantity: cartProduct.quantity,
              };
            }),
          };
        }),
      });
    } catch (err: unknown) {
      this.Logger.error(err);
      return next(err);
    }
  }

  async addProductToCart(
    request: Request,
    response: Response,
    next: NextFunction,
    productId: number,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const product = await this.productService.findById(productId);
      const user: User | Admin | Owner | null = request['user'];
      const cartIdentifier = request.signedCookies['_id'];
      let cart: Cart = await this.findCartByIdentifier(cartIdentifier);
      if (user) {
        cart = user.cart;
      }
      const cartProductIndex = cart.cartProducts.findIndex(
        (cartProduct: CartProduct) => {
          return cartProduct.productId === product.id;
        },
      );
      let newQuantity = 1;
      if (cartProductIndex >= 0) {
        newQuantity = cart.cartProducts[cartProductIndex].quantity + 1;
        cart.cartProducts[cartProductIndex].quantity = newQuantity;
        await cart.save();
      } else {
        const newCartProduct = await this.cartProductRepository.create({
          quantity: newQuantity,
          productId: product.id,
          cartId: cart.id,
        });
        newCartProduct.set('product', product);
        newCartProduct.set('cart', cart);
        cart.$add('cartProducts', newCartProduct);
        await Promise.all([await cart.save(), await newCartProduct.save()]);
      }
      return response.json({ cart });
    } catch (err: unknown) {
      this.Logger.error(err);
      return next(err);
    }
  }

  async deleteProductFromCart(
    request: Request,
    response: Response,
    next: NextFunction,
    productId: number,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const product = await this.productService.findById(productId);
      const user: User | Admin | Owner | null = request['user'];
      const cartIdentifier = request.signedCookies['_id'];
      let cart: Cart = await this.findCartByIdentifier(cartIdentifier);
      if (user) {
        cart = user.cart;
      }
      const updatedCartItems = cart.cartProducts.filter(
        (cartProduct: CartProduct) => {
          return cartProduct.productId !== product.id;
        },
      );
      cart.cartProducts = updatedCartItems;
      await cart.save();
      return response.json({ cart });
    } catch (err: unknown) {
      this.Logger.error(err);
      return next(err);
    }
  }

  async clearCart(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const user: User | Admin | Owner | null = request['user'];
      const cartIdentifier = request.signedCookies['_id'];
      let cart: Cart = await this.findCartByIdentifier(cartIdentifier);
      if (user) {
        cart = user.cart;
      }
      cart.cartProducts = [];
      await cart.save();
      return response.json({ cart });
    } catch (err: unknown) {
      this.Logger.error(err);
      return next(err);
    }
  }

  async createCart(identifier: string): Promise<Cart> {
    const cart = await this.cartRepository.create({
      cartStatus: 'Open',
      totalPrice: 0,
      products: [],
      cartProducts: [],
      identifier: identifier,
    });
    return cart;
  }

  async findCartByIdentifier(identifier: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: {
        identifier: identifier,
      },
      include: {
        all: true,
      },
    });
    if (!cart) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        CART_NOT_FOUND,
      );
    }
    return cart;
  }

  async deleteCart(cartId: number, identifier: string): Promise<number> {
    const cart = await this.cartRepository.findOne({
      where: {
        id: cartId,
        identifier: identifier,
      },
    });
    if (!cart) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        CART_NOT_FOUND,
      );
    }
    const deletedCart = await this.cartRepository.destroy({
      where: {
        id: cart.id,
        identifier: cart.identifier,
      },
    });
    return deletedCart;
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
