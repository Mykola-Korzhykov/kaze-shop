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
exports.UserRefreshToken = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
let UserRefreshToken = class UserRefreshToken extends sequelize_typescript_1.Model {
    getExpireDate() {
        return this.expireDate;
    }
    setExpireDate(expireDate) {
        this.expireDate = expireDate;
        return this.expireDate;
    }
    getuserId() {
        return this.userId;
    }
    setuserId(userId) {
        this.userId = userId;
        return this.userId;
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
], UserRefreshToken.prototype, "id", void 0);
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
], UserRefreshToken.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJuilbgghbGciOiJIUzihnuohlI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWN0aXZhdGVkIjpmYWxzZSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJVU0VSIiwiZGVzY3JpcHRpb24iOiJzaW1wbGUgdXNlciIsInJpZ2h0MSI6ZmFsc2UsInJpZ2h0MiI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsIlVzZXJSb2xlcyI6eyJpZCI6MSwicm9sZUlkIjoxLCJ1c2VySWQiOjEsImFkbWluSWQiOm51bGx9fV0sImlhdCI6MTY3Mzg2NTcxNiwiZXhwIjoxNjczODY5MzE2fQ.cx0YqrXwrvrL8wNMsnTiitL632ORCOxYUJuNQ-g4lOc',
        description: 'user`s refresh token',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(2500),
        unique: true,
        allowNull: false,
        field: 'userRefreshToken',
    }),
    __metadata("design:type", String)
], UserRefreshToken.prototype, "userRefreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'userId' }),
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], UserRefreshToken.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '86400000', description: 'expireDate' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'expireDate',
    }),
    __metadata("design:type", Date)
], UserRefreshToken.prototype, "expireDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], UserRefreshToken.prototype, "user", void 0);
UserRefreshToken = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'user refresh tokens' })
], UserRefreshToken);
exports.UserRefreshToken = UserRefreshToken;
//# sourceMappingURL=user.refresh.token.model.js.map