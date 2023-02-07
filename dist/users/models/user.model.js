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
exports.User = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const cart_model_1 = require("../../cart/models/cart.model");
const admin_model_1 = require("../../admin/models/admin.model");
const roles_model_1 = require("../../roles/models/roles.model");
const user_roles_model_1 = require("../../roles/models/user.roles.model");
const user_refresh_token_model_1 = require("./user.refresh.token.model");
let User = class User extends sequelize_typescript_1.Model {
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
    getCity() {
        return this.city;
    }
    setCity(city) {
        this.city = city;
        return this.city;
    }
    getCountry() {
        return this.country;
    }
    setCountry(country) {
        this.country = country;
        return this.country;
    }
    getPostOffice() {
        return this.postOffice;
    }
    setPostOffice(postOffice) {
        this.postOffice = postOffice;
        return this.postOffice;
    }
    getIsAdmin() {
        return this.isAdmin;
    }
    setIsAdmin(isAdmin) {
        this.isAdmin = isAdmin;
        return this.isAdmin;
    }
    getEditWebSite() {
        return this.editWebSite;
    }
    setEditWebsite(editWebSite) {
        this.editWebSite = editWebSite;
        return editWebSite;
    }
    getAddContent() {
        return this.addContent;
    }
    setAddContent(addContent) {
        this.addContent = addContent;
        return this.addContent;
    }
    getEditContent() {
        return this.editContent;
    }
    setEditContent(editContent) {
        this.editContent = editContent;
        return this.editContent;
    }
    getCarts() {
        return this.carts;
    }
    getUserRefreshToken() {
        return this.userRefreshToken;
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
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'user`s Name' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'name',
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cusler', description: 'user`s surname' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'surname',
    }),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+251912345678', description: 'user`s phoneNumber' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'phoneNumber',
    }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'user`s email' }),
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'email',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'etrhg45ty5yeewt4t4665y', description: 'resetToken' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'resetToken',
    }),
    __metadata("design:type", String)
], User.prototype, "resetToken", void 0);
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
], User.prototype, "resetTokenExpiration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'user`s password',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'password',
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'true',
        description: 'Is user banned or not?',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        defaultValue: 'false',
        field: 'banned',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "banned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Bad behaviour',
        description: 'Reason of banning a user',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'banReason',
    }),
    __metadata("design:type", String)
], User.prototype, "banReason", void 0);
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
], User.prototype, "confirmCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Is user activated',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'isActivated',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isActivated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Ukraine',
        description: 'country',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'country',
    }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lviv',
        description: 'city',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'city',
    }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lviv',
        description: 'postOffice',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'postOffice',
    }),
    __metadata("design:type", String)
], User.prototype, "postOffice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Is user Admin',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'isAdmin',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Right to edit website',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'editWebSite',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "editWebSite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Right to add content',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'addContent',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "addContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Right to edit content',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'editContent',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "editContent", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => admin_model_1.Admin),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: true,
        field: 'adminId',
    }),
    __metadata("design:type", Number)
], User.prototype, "adminId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => roles_model_1.Role, () => user_roles_model_1.UserRoles),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_refresh_token_model_1.UserRefreshToken),
    __metadata("design:type", user_refresh_token_model_1.UserRefreshToken)
], User.prototype, "userRefreshToken", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_model_1.Cart),
    __metadata("design:type", Array)
], User.prototype, "carts", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users' })
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map