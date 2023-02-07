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
exports.CreateUserRefreshTokenDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_constants_1 = require("../constants/user.constants");
class CreateUserRefreshTokenDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'unique identifier' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserRefreshTokenDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Is user activated',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserRefreshTokenDto.prototype, "isActivated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '[User, Admin]',
        description: 'roles of User',
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateUserRefreshTokenDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'user`s email' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, {
        message: user_constants_1.EMAIL_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateUserRefreshTokenDto.prototype, "email", void 0);
exports.CreateUserRefreshTokenDto = CreateUserRefreshTokenDto;
//# sourceMappingURL=create-user-refresh-token.dto.js.map