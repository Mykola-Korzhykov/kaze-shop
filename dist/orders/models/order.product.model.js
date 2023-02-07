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
exports.OrderProduct = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = require("../../product/product.model");
const order_model_1 = require("./order.model");
let OrderProduct = class OrderProduct extends sequelize_typescript_1.Model {
    getProduct() {
        return this.product;
    }
    getOrder() {
        return this.order;
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
], OrderProduct.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        allowNull: false,
        field: 'productId',
    }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'price',
    }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => order_model_1.Order),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        allowNull: false,
        field: 'orderId',
    }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "orderId", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: false,
        field: 'quantity',
    }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => order_model_1.Order),
    __metadata("design:type", order_model_1.Order)
], OrderProduct.prototype, "order", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product),
    __metadata("design:type", product_model_1.Product)
], OrderProduct.prototype, "product", void 0);
OrderProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'orderproduct' })
], OrderProduct);
exports.OrderProduct = OrderProduct;
//# sourceMappingURL=order.product.model.js.map