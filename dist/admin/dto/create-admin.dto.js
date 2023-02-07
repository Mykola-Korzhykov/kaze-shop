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
exports.CreateAdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const admin_constants_1 = require("../constants/admin.constants");
class CreateAdminDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'admin`s name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9_-]{2,20}/, {
        message: admin_constants_1.ADMINNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Casler', description: 'admin`s name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9_-]{2,20}/, {
        message: admin_constants_1.ADMINNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+251912345678',
        description: 'admin`s phone number',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
        message: admin_constants_1.PHONENUMBER_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'admin`s email' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/^[a-z0-9]+@[a-z]+\.[a-z]{2,64}$/, {
        message: admin_constants_1.EMAIL_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'admin`s password',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665yупвіяпвкірніп',
        description: 'admin`s activation link',
    }),
    (0, class_validator_1.IsUUID)(4),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "activationLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'False',
        description: 'Right to edit website',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAdminDto.prototype, "editWebSite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'False',
        description: 'Right to add content',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAdminDto.prototype, "addContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'False',
        description: 'Right to edit content',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAdminDto.prototype, "editContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'False',
        description: 'is user Admin',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAdminDto.prototype, "isAdmin", void 0);
exports.CreateAdminDto = CreateAdminDto;
//# sourceMappingURL=create-admin.dto.js.map