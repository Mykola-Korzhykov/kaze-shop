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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserJwtRefreshTokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_refresh_constants_1 = require("../constants/jwt-refresh.constants");
const user_refresh_token_model_1 = require("../models/user.refresh.token.model");
const users_service_1 = require("./users.service");
const sequelize_1 = require("@nestjs/sequelize");
const scedule_service_1 = require("../../core/services/scedule.service");
const api_exception_1 = require("../../common/exceptions/api.exception");
let UserJwtRefreshTokenService = class UserJwtRefreshTokenService {
    constructor(jwtService, userService, sheduleService, userRefreshTokenRepository) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.sheduleService = sheduleService;
        this.userRefreshTokenRepository = userRefreshTokenRepository;
    }
    generateRefreshToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRefreshToken = this.jwtService.sign(payload);
                return userRefreshToken;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SIGNING_TOKEN);
            }
        });
    }
    validateRefreshToken(userRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = this.jwtService.verify(userRefreshToken);
                if (!userData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
                }
                return userData;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_VALIDATING_TOKEN);
            }
        });
    }
    saveToken(userId, userRefreshToken, email, userAgent, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.USER_NOT_FOUND);
                }
                const tokenData = yield this.userRefreshTokenRepository.findOne({
                    where: { userId: userId },
                });
                if (tokenData) {
                    tokenData.userRefreshToken = userRefreshToken;
                    return tokenData.save();
                }
                const token = yield this.userRefreshTokenRepository.create({
                    userRefreshToken: userRefreshToken,
                    userId: userId,
                    email: email,
                    userAgent: userAgent ||
                        'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
                });
                if (!token.getExpireDate()) {
                    token.setExpireDate(expireDate);
                    yield token.save();
                }
                return token;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SAVING_TOKEN);
            }
        });
    }
    removeToken(userRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.findToken(userRefreshToken);
                if (!token) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                const tokenData = yield this.userRefreshTokenRepository.destroy({
                    where: { userRefreshToken: userRefreshToken },
                });
                return tokenData;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_REMOVING_TOKEN);
            }
        });
    }
    findToken(userRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield user_refresh_token_model_1.UserRefreshToken.findOne({
                where: { userRefreshToken: userRefreshToken },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
            }
            return token;
        });
    }
    removeTokenInTime(userRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.userRefreshTokenRepository.findOne({
                where: {
                    userRefreshToken: userRefreshToken,
                },
            });
            if (!token) {
                return false;
            }
            return this.userRefreshTokenRepository.destroy({
                where: { userRefreshToken: userRefreshToken },
            });
        });
    }
};
UserJwtRefreshTokenService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(3, (0, sequelize_1.InjectModel)(user_refresh_token_model_1.UserRefreshToken)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        scedule_service_1.TasksService, Object])
], UserJwtRefreshTokenService);
exports.UserJwtRefreshTokenService = UserJwtRefreshTokenService;
//# sourceMappingURL=jwt-refresh.service.js.map