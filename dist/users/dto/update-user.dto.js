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
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_constants_1 = require("../constants/user.constants");
class UpdateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'user`s name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, {
        message: user_constants_1.USERNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cusler', description: 'user`s surname' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, {
        message: user_constants_1.SURNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lviv',
        description: 'city',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Ukraine',
        description: 'country',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lviv',
        description: 'postOffice',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "postOffice", void 0);
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map