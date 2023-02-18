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
exports.Product = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cart_item_model_1 = require("../cart/models/cart-item.model");
const cart_model_1 = require("../cart/models/cart.model");
const order_model_1 = require("../orders/models/order.model");
const order_product_model_1 = require("../orders/models/order.product.model");
const category_model_1 = require("../categories/models/category.model");
const product_categories_model_1 = require("../categories/models/product.categories.model");
const owner_model_1 = require("../owner/models/owner.model");
const admin_model_1 = require("../admin/models/admin.model");
let Product = class Product extends sequelize_typescript_1.Model {
    getCategories() {
        return this.categories;
    }
    setCategories(categories) {
        this.categories = categories;
        return this.categories;
    }
    getCarts() {
        return this.carts;
    }
    getAuthor() {
        return this.owner;
    }
    getOwnerId() {
        return this.ownerId;
    }
    setOwnerId(ownerId) {
        this.ownerId = ownerId;
        return this.ownerId;
    }
    getAdminId() {
        return this.adminId;
    }
    setAdminId(adminId) {
        this.adminId = adminId;
        return adminId;
    }
    getOrders() {
        return this.orders;
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
], Product.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'title',
    }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'description',
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: false,
        field: 'price',
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        unique: false,
        allowNull: false,
        field: 'images',
    }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'sizeChart',
    }),
    __metadata("design:type", String)
], Product.prototype, "sizeChartImage", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.ENUM('S', 'XXS', 'XS', 'M', 'L', 'XL')),
        unique: false,
        allowNull: true,
        field: 'sizes',
    }),
    __metadata("design:type", Array)
], Product.prototype, "sizes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        unique: false,
        allowNull: true,
        field: 'colours',
    }),
    __metadata("design:type", Array)
], Product.prototype, "colours", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: false,
        field: 'quantity',
    }),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => admin_model_1.Admin),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, allowNull: true }),
    __metadata("design:type", Number)
], Product.prototype, "adminId", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => owner_model_1.Owner),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, allowNull: true }),
    __metadata("design:type", Number)
], Product.prototype, "ownerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => owner_model_1.Owner),
    __metadata("design:type", owner_model_1.Owner)
], Product.prototype, "owner", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => admin_model_1.Admin),
    __metadata("design:type", admin_model_1.Admin)
], Product.prototype, "admin", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => category_model_1.Category, () => product_categories_model_1.ProductCategories),
    __metadata("design:type", Array)
], Product.prototype, "categories", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => cart_model_1.Cart, () => cart_item_model_1.CartProduct),
    __metadata("design:type", Array)
], Product.prototype, "carts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => order_model_1.Order, () => order_product_model_1.OrderProduct),
    __metadata("design:type", Array)
], Product.prototype, "orders", void 0);
Product = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'products' })
], Product);
exports.Product = Product;
//# sourceMappingURL=product.model.js.map