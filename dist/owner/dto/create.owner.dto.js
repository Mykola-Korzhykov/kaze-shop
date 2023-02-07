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
exports.CreateOwnerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const owner_constants_1 = require("../constants/owner.constants");
class CreateOwnerDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'owner`s name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9_-]{2,20}/, {
        message: owner_constants_1.OWNERNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateOwnerDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Casler', description: 'owner`s name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9_-]{2,20}/, {
        message: owner_constants_1.OWNERNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateOwnerDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+251912345678',
        description: 'owner`s phone number',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
        message: owner_constants_1.PHONENUMBER_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateOwnerDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'owner`s email' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/^[a-z0-9]+@[a-z]+\.[a-z]{2,64}$/, {
        message: owner_constants_1.EMAIL_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateOwnerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'owner`s password',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,64}$/gm, {
        message: owner_constants_1.PASSWORD_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateOwnerDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665yупвіяпвкірніп',
        description: 'owner`s activation link',
    }),
    (0, class_validator_1.IsUUID)(4),
    __metadata("design:type", String)
], CreateOwnerDto.prototype, "activationLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
        description: 'owner`s agent',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOwnerDto.prototype, "ownerAgent", void 0);
exports.CreateOwnerDto = CreateOwnerDto;
//# sourceMappingURL=create.owner.dto.js.map