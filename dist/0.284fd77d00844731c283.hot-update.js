"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 157:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var CartService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartService = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const api_exception_1 = __webpack_require__(52);
const cart_constants_1 = __webpack_require__(58);
const cart_model_1 = __webpack_require__(36);
const cart_product_model_1 = __webpack_require__(33);
const product_service_1 = __webpack_require__(134);
const crypto_1 = __webpack_require__(14);
const util_1 = __webpack_require__(15);
const uuid_1 = __webpack_require__(59);
const colours_service_1 = __webpack_require__(139);
let CartService = CartService_1 = class CartService {
    constructor(cartProductRepository, cartRepository, productService, colourSevice) {
        this.cartProductRepository = cartProductRepository;
        this.cartRepository = cartRepository;
        this.productService = productService;
        this.colourSevice = colourSevice;
        this.Logger = new common_1.Logger(CartService_1.name);
    }
    setCart(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!request.signedCookies['_id']) {
                    const _id = yield this.generateEncryptedValue('USER', 16);
                    yield this.createCart(_id);
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
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getCart(response, request, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request['user'];
                const cartIdentifier = request.signedCookies['_id'];
                let cart = yield this.findCartByIdentifier(cartIdentifier);
                if (user) {
                    cart = user.cart;
                }
                const currency = request['currency'];
                let totalPrice = 0;
                cart.cartProducts.forEach((cartProduct) => {
                    totalPrice += Number(cartProduct.quantity) * Number(cartProduct.price);
                });
                cart.totalPrice = totalPrice;
                yield cart.save();
                return response.json({
                    cart: {
                        id: cart.id,
                        cartStatus: cart.cartStatus,
                        totalPrice: totalPrice * currency.rate + currency.symbol,
                        cartProducts: cart.cartProducts.map((cartProduct) => {
                            return {
                                id: cartProduct.id,
                                color: cartProduct.colour,
                                size: cartProduct.size,
                                price: cartProduct.price * currency.rate + currency.symbol,
                                imageUrl: cartProduct.imageUrl,
                                colourId: cartProduct.colourId,
                                colour: cartProduct.colour,
                                productId: cartProduct.productId,
                                quantity: cartProduct.quantity,
                            };
                        }),
                    },
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    getLeftCarts(response, request, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request['user'];
                const leftCarts = user.leftCarts;
                const currency = request['currency'];
                return response.json({
                    leftCarts: leftCarts.map((cart) => {
                        let totalPrice = 0;
                        cart.cartProducts.forEach((cartProduct) => {
                            totalPrice +=
                                Number(cartProduct.quantity) * Number(cartProduct.product.price);
                        });
                        return {
                            id: cart.id,
                            cartStatus: cart.cartStatus,
                            totalPrice: totalPrice * currency.rate + currency.symbol,
                            cartProducts: cart.cartProducts.map((cartProduct) => {
                                return {
                                    id: cartProduct.id,
                                    color: cartProduct.colour,
                                    size: cartProduct.size,
                                    price: cartProduct.price * currency.rate + currency.symbol,
                                    imageUrl: cartProduct.imageUrl,
                                    colourId: cartProduct.colourId,
                                    colour: cartProduct.colour,
                                    productId: cartProduct.productId,
                                    quantity: cartProduct.quantity,
                                };
                            }),
                        };
                    }),
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    addProductToCart(request, response, next, productId, addProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productService.findById(productId);
                const user = request['user'];
                const cartIdentifier = request.signedCookies['_id'];
                let cart = yield this.findCartByIdentifier(cartIdentifier);
                if (user) {
                    cart = user.cart;
                }
                const cartProductIndex = cart.cartProducts.findIndex((cartProduct) => {
                    return (addProduct.imageUrl === cartProduct.imageUrl &&
                        addProduct.size === cartProduct.size &&
                        addProduct.colorId === cartProduct.colourId);
                });
                let newQuantity = 1;
                if (cartProductIndex >= 0) {
                    newQuantity = cart.cartProducts[cartProductIndex].quantity + 1;
                    cart.cartProducts[cartProductIndex].quantity = newQuantity;
                    cart.totalPrice += product.price;
                    yield cart.save();
                }
                else {
                    const newCartProduct = yield this.cartProductRepository.create({
                        imageUrl: addProduct.imageUrl,
                        size: addProduct.size,
                        colorId: addProduct.colorId,
                        quantity: newQuantity,
                        productId: product.id,
                        cartId: cart.id,
                        price: product.price,
                    });
                    const colour = yield this.colourSevice.getColourById(addProduct.colorId);
                    newCartProduct.set('colour', colour);
                    newCartProduct.set('product', product);
                    newCartProduct.set('cart', cart);
                    cart.$add('cartProducts', newCartProduct);
                    yield Promise.all([yield cart.save(), yield newCartProduct.save()]);
                    let newTotalPrice = 0;
                    cart.cartProducts.forEach((cartProduct) => {
                        newTotalPrice +=
                            Number(cartProduct.quantity) * Number(cartProduct.product.price);
                    });
                    cart.totalPrice = newTotalPrice;
                    yield cart.save();
                }
                return response.json({ cart });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    deleteProductFromCart(request, response, next, cartProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productService.findById(productId);
                const user = request['user'];
                const cartIdentifier = request.signedCookies['_id'];
                let cart = yield this.findCartByIdentifier(cartIdentifier);
                if (user) {
                    cart = user.cart;
                }
                const cartProductIndex = cart.cartProducts.findIndex((cartProduct) => {
                    return cartProduct.id === cartProductId;
                });
                yield cart.save();
                return response.json({ cart });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    clearCart(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request['user'];
                const cartIdentifier = request.signedCookies['_id'];
                let cart = yield this.findCartByIdentifier(cartIdentifier);
                if (user) {
                    cart = user.cart;
                }
                cart.cartProducts = [];
                yield cart.save();
                return response.json({ cart });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    createCart(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.create({
                cartStatus: 'Open',
                totalPrice: 0,
                products: [],
                cartProducts: [],
                identifier: identifier,
            });
            return cart;
        });
    }
    findCartByIdentifier(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findOne({
                where: {
                    identifier: identifier,
                },
                include: {
                    all: true,
                },
            });
            if (!cart) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', cart_constants_1.CART_NOT_FOUND);
            }
            return cart;
        });
    }
    deleteCart(cartId, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findOne({
                where: {
                    id: cartId,
                    identifier: identifier,
                },
            });
            if (!cart) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', cart_constants_1.CART_NOT_FOUND);
            }
            const deletedCart = yield this.cartRepository.destroy({
                where: {
                    id: cart.id,
                    identifier: cart.identifier,
                },
            });
            return deletedCart;
        });
    }
    generateEncryptedValue(value, bytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const iv = (0, crypto_1.randomBytes)(bytes);
            const API_KEY = process.env.API_KEY.toString();
            const key = (yield (0, util_1.promisify)(crypto_1.scrypt)(API_KEY, 'salt', 32));
            const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
            return Buffer.concat([cipher.update(value), cipher.final()])
                .toString('base64')
                .replace('/', `${(0, uuid_1.v4)()}`)
                .replace('=', `${(0, uuid_1.v4)()}`);
        });
    }
};
CartService = CartService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(cart_product_model_1.CartProduct)),
    __param(1, (0, sequelize_1.InjectModel)(cart_model_1.Cart)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object, typeof (_b = typeof colours_service_1.ColoursService !== "undefined" && colours_service_1.ColoursService) === "function" ? _b : Object])
], CartService);
exports.CartService = CartService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("675c8c5e785665b7301a")
/******/ })();
/******/ 
/******/ }
;