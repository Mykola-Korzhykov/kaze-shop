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
exports.Admin = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const class_transformer_1 = require("class-transformer");
const roles_model_1 = require("../../roles/models/roles.model");
const user_roles_model_1 = require("../../roles/models/user.roles.model");
const user_model_1 = require("../../users/models/user.model");
const admin_refresh_token_model_1 = require("./admin.refresh.token.model");
const product_model_1 = require("../../product/product.model");
let Admin = class Admin extends sequelize_typescript_1.Model {
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
    getProducts() {
        return this.products;
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
    getAdminAgent() {
        return this.adminAgent;
    }
    setAdminAgent(adminAgent) {
        this.adminAgent = adminAgent;
        return this.adminAgent;
    }
    getActivationCode() {
        return this.activationCode;
    }
    setActivationCode(activationCode) {
        this.activationCode = activationCode;
        return this.activationCode;
    }
    getAdminRefreshTken() {
        return this.adminRefreshToken;
    }
    getUser() {
        return this.user;
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
], Admin.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@gmail.com', description: 'admin`s email' }),
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'email',
    }),
    __metadata("design:type", String)
], Admin.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'admin`s Name' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'name',
    }),
    __metadata("design:type", String)
], Admin.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cusler', description: 'admin`s surname' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'surname',
    }),
    __metadata("design:type", String)
], Admin.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+251912345678', description: 'admin`s phoneNumber' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'phoneNumber',
    }),
    __metadata("design:type", String)
], Admin.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'etrhg45ty5yeewt4t4665y', description: 'resetToken' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'resetToken',
    }),
    __metadata("design:type", String)
], Admin.prototype, "resetToken", void 0);
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
], Admin.prototype, "resetTokenExpiration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'admin`s password',
    }),
    (0, class_transformer_1.Exclude)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'password',
    }),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
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
], Admin.prototype, "isActivated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
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
], Admin.prototype, "activationLink", void 0);
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
], Admin.prototype, "confirmCode", void 0);
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
], Admin.prototype, "activationCode", void 0);
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
], Admin.prototype, "editWebSite", void 0);
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
], Admin.prototype, "addContent", void 0);
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
], Admin.prototype, "editContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'userId' }),
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], Admin.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
        description: 'admin`s agent',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(350),
        unique: false,
        allowNull: true,
        field: 'userAgent',
    }),
    __metadata("design:type", String)
], Admin.prototype, "adminAgent", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_model_1.Product),
    __metadata("design:type", Array)
], Admin.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => admin_refresh_token_model_1.AdminRefreshToken),
    __metadata("design:type", admin_refresh_token_model_1.AdminRefreshToken)
], Admin.prototype, "adminRefreshToken", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => roles_model_1.Role, () => user_roles_model_1.UserRoles),
    __metadata("design:type", Array)
], Admin.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Admin.prototype, "user", void 0);
Admin = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'admins' })
], Admin);
exports.Admin = Admin;
//# sourceMappingURL=admin.model.js.map