"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 34:
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Colour = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const cart_product_model_1 = __webpack_require__(33);
const product_model_1 = __webpack_require__(32);
const product_colour_model_1 = __webpack_require__(35);
let Colour = class Colour extends sequelize_typescript_1.Model {
    getProducts() {
        return this.products;
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
], Colour.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'ua-locale',
    }),
    __metadata("design:type", String)
], Colour.prototype, "ua", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'ru-locale',
    }),
    __metadata("design:type", String)
], Colour.prototype, "ru", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'en-locale',
    }),
    __metadata("design:type", String)
], Colour.prototype, "en", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'rs-locale',
    }),
    __metadata("design:type", String)
], Colour.prototype, "rs", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'hex',
    }),
    __metadata("design:type", String)
], Colour.prototype, "hex", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cart_product_model_1.CartProduct),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        field: 'cartProductId',
    }),
    __metadata("design:type", Number)
], Colour.prototype, "cartProductId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => product_colour_model_1.ProductColours),
    __metadata("design:type", Array)
], Colour.prototype, "products", void 0);
Colour = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'COLOURS' })
], Colour);
exports.Colour = Colour;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("471fa333f72f2d150ab7")
/******/ })();
/******/ 
/******/ }
;