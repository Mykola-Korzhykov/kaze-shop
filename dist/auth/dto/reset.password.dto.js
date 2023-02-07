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
exports.ResetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../../common/decorators/match.decorator");
const auth_constants_1 = require("../auth.constants");
class ResetDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'user`s email' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, {
        message: auth_constants_1.EMAIL_VALIDATION,
    }),
    __metadata("design:type", String)
], ResetDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '46756868', description: 'user`s code' }),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'user`s password',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: auth_constants_1.PASSWORD_VALIDATION,
    }),
    __metadata("design:type", String)
], ResetDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'user`s confirm password',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: auth_constants_1.PASSWORD_VALIDATION,
    }),
    (0, match_decorator_1.Match)('password'),
    __metadata("design:type", String)
], ResetDto.prototype, "confirmPassword", void 0);
exports.ResetDto = ResetDto;
//# sourceMappingURL=reset.password.dto.js.map