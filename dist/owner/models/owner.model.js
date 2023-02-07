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
exports.Owner = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const sequelize_typescript_1 = require("sequelize-typescript");
const roles_model_1 = require("../../roles/models/roles.model");
const user_roles_model_1 = require("../../roles/models/user.roles.model");
const product_model_1 = require("../../product/product.model");
const owner_refresh_token_model_1 = require("./owner.refresh.token.model");
let Owner = class Owner extends sequelize_typescript_1.Model {
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
        return this.name;
    }
    getSurname() {
        return this.surname;
    }
    setSurname(surname) {
        this.surname = surname;
        return this.surname;
    }
    getPassword() {
        return this.password;
    }
    setNewPasssword(password) {
        this.password = password;
        return this.password;
    }
    getEmail() {
        return this.email;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    getIsActivated() {
        return this.isActivated;
    }
    setIsActivated(isActivated) {
        this.isActivated = isActivated;
        return this.isActivated;
    }
    getConfirmCode() {
        return this.confirmCode;
    }
    setConfirmCode(confirnCode) {
        this.confirmCode = confirnCode;
        return this.confirmCode;
    }
    getResetToken() {
        return this.resetToken;
    }
    setResetToken(resetToken) {
        this.resetToken = resetToken;
        return this.resetToken;
    }
    getResetTokenExpiration() {
        return this.resetTokenExpiration;
    }
    setResetTokenExpiration(resetTokenExpiration) {
        this.resetTokenExpiration = resetTokenExpiration;
        return this.resetTokenExpiration;
    }
    getOwnerAgent() {
        return this.ownerAgent;
    }
    setOwnerAgent(ownerAgent) {
        this.ownerAgent = ownerAgent;
        return this.ownerAgent;
    }
    getActivationCode() {
        return this.activationCode;
    }
    setActivationCode(activationCode) {
        this.activationCode = activationCode;
        return this.activationCode;
    }
    getProducts() {
        return this.products;
    }
    getOwnerRefreshToken() {
        return this.ownerRefreshToken;
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'unique identifier' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id',
    }),
    __metadata("design:type", Number)
], Owner.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'owner@gmail.com', description: 'owner`s email' }),
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'email',
    }),
    __metadata("design:type", String)
], Owner.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'owner`s Name' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'name',
    }),
    __metadata("design:type", String)
], Owner.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cusler', description: 'owner`s surname' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'surname',
    }),
    __metadata("design:type", String)
], Owner.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+251912345678', description: 'owner`s phoneNumber' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'phoneNumber',
    }),
    __metadata("design:type", String)
], Owner.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'etrhg45ty5yeewt4t4665y', description: 'resetToken' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'resetToken',
    }),
    __metadata("design:type", String)
], Owner.prototype, "resetToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'resetTokenExpiration',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'resetTokenExpiration',
    }),
    __metadata("design:type", Number)
], Owner.prototype, "resetTokenExpiration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'owner`s password',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'password',
    }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Owner.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Is admin activated',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'isActivated',
    }),
    __metadata("design:type", Boolean)
], Owner.prototype, "isActivated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'http://sdgdgsgsfhd_rh;eh',
        description: 'activationLink',
    }),
    (0, sequelize_typescript_1.IsUUID)(4),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'activationLink',
    }),
    __metadata("design:type", String)
], Owner.prototype, "activationLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '56733423',
        description: 'confirmCode',
    }),
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: true,
        field: 'confirmCode',
    }),
    __metadata("design:type", Number)
], Owner.prototype, "confirmCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
        description: 'owner`s agent',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(350),
        unique: true,
        allowNull: true,
        field: 'ownerAgent',
    }),
    __metadata("design:type", String)
], Owner.prototype, "ownerAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '56733423',
        description: 'activationCode',
    }),
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: true,
        field: 'activationCode',
    }),
    __metadata("design:type", Number)
], Owner.prototype, "activationCode", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_model_1.Product),
    __metadata("design:type", Array)
], Owner.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => roles_model_1.Role, () => user_roles_model_1.UserRoles),
    __metadata("design:type", Array)
], Owner.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => owner_refresh_token_model_1.OwnerRefreshToken),
    __metadata("design:type", owner_refresh_token_model_1.OwnerRefreshToken)
], Owner.prototype, "ownerRefreshToken", void 0);
Owner = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'OWNER' })
], Owner);
exports.Owner = Owner;
//# sourceMappingURL=owner.model.js.map