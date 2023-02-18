"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = require("../../product/models/product.model");
const user_model_1 = require("../../users/models/user.model");
const cart_product_model_1 = require("./cart.product.model");
let Cart = class Cart extends sequelize_typescript_1.Model {
    getCartStatus() {
        return this.cartStatus;
    }
    setCartStatus(cartStatus) {
        this.cartStatus = cartStatus;
        return this.cartStatus;
    }
    getProducts() {
        return this.products;
    }
    getCartProducts() {
        return this.cartProducts;
    }
    getUser() {
        return this.user;
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
    }),
    __metadata("design:type", Number)
], Cart.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('Open', 'CheckedOut'),
        unique: false,
        field: 'cartStatus',
    }),
    __metadata("design:type", String)
], Cart.prototype, "cartStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        field: 'totalPrice',
    }),
    __metadata("design:type", Number)
], Cart.prototype, "totalPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], Cart.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Cart.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => cart_product_model_1.CartProduct),
    __metadata("design:type", Array)
], Cart.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_product_model_1.CartProduct),
    __metadata("design:type", Array)
], Cart.prototype, "cartProducts", void 0);
Cart = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'CARTS' })
], Cart);
exports.Cart = Cart;
//# sourceMappingURL=cart.model.js.map