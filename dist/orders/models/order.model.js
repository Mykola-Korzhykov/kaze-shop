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
exports.Order = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = require("../../product/product.model");
const user_model_1 = require("../../users/models/user.model");
const order_product_model_1 = require("./order.product.model");
let Order = class Order extends sequelize_typescript_1.Model {
    getUser() {
        return this.user;
    }
    getOrderStatus() {
        return this.orderStatus;
    }
    setOrderStatus(orderStatus) {
        this.orderStatus = orderStatus;
        return this.orderStatus;
    }
    getOrderProducts() {
        return this.orderProducts;
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
], Order.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('Canceled', 'Submitted', 'Completed', 'Processing'),
        unique: false,
        field: 'orderStatus',
    }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], Order.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'totalPrice',
    }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_product_model_1.OrderProduct),
    __metadata("design:type", Array)
], Order.prototype, "orderProducts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => order_product_model_1.OrderProduct),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
Order = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'orders' })
], Order);
exports.Order = Order;
//# sourceMappingURL=order.model.js.map