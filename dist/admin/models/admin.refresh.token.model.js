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
exports.AdminRefreshToken = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const admin_model_1 = require("./admin.model");
let AdminRefreshToken = class AdminRefreshToken extends sequelize_typescript_1.Model {
    getExpireDate() {
        return this.expireDate;
    }
    setExpireDate(expireDate) {
        this.expireDate = expireDate;
        return this.expireDate;
    }
    getAdminAgent() {
        return this.adminAgent;
    }
    setAdminAgent(adminAgent) {
        this.adminAgent = adminAgent;
        return this.adminAgent;
    }
    getAdmin() {
        return this.admin;
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
], AdminRefreshToken.prototype, "id", void 0);
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
], AdminRefreshToken.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+251912345678', description: 'admin`s phoneNumber' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'phoneNumber',
    }),
    __metadata("design:type", String)
], AdminRefreshToken.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJrdyIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWN0aXZhdGVkIjpmYWxzZSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJVU0VSIiwiZGVzY3JpcHRpb24iOiJzaW1wbGUgdXNlciIsInJpZ2h0MSI6ZmFsc2UsInJpZ2h0MiI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsIlVzZXJSb2xlcyI6eyJpZCI6MSwicm9sZUlkIjoxLCJ1c2VySWQiOjEsImFkbWluSWQiOm51bGx9fV0sImlhdCI6MTY3Mzg2NTcxNiwiZXhwIjoxNjczODY5MzE2fQ.cx0YqrXwrvrL8wNMsnTiitL632ORCOxYUJuNQ-g4lOc',
        description: 'admin`s refresh token',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(2500),
        unique: true,
        allowNull: false,
        field: 'adminRefreshToken',
    }),
    __metadata("design:type", String)
], AdminRefreshToken.prototype, "adminRefreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'adminId' }),
    (0, sequelize_typescript_1.ForeignKey)(() => admin_model_1.Admin),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'adminId',
    }),
    __metadata("design:type", Number)
], AdminRefreshToken.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
        description: 'admin`s agent',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(350),
        unique: false,
        allowNull: false,
        field: 'userAgent',
    }),
    __metadata("design:type", String)
], AdminRefreshToken.prototype, "adminAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '86400000', description: 'expireDate' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'expireDate',
    }),
    __metadata("design:type", Date)
], AdminRefreshToken.prototype, "expireDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => admin_model_1.Admin),
    __metadata("design:type", admin_model_1.Admin)
], AdminRefreshToken.prototype, "admin", void 0);
AdminRefreshToken = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Admin refresh tokens' })
], AdminRefreshToken);
exports.AdminRefreshToken = AdminRefreshToken;
//# sourceMappingURL=admin.refresh.token.model.js.map