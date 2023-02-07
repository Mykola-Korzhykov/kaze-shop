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
exports.OwnerJwtRefreshService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const api_exception_1 = require("../../common/exceptions/api.exception");
const scedule_service_1 = require("../../core/services/scedule.service");
const mail_service_1 = require("../../mail/mail.service");
const jwt_refresh_constants_1 = require("../constants/jwt-refresh.constants");
const owner_constants_1 = require("../constants/owner.constants");
const owner_refresh_token_model_1 = require("../models/owner.refresh.token.model");
const owner_service_1 = require("./owner.service");
let OwnerJwtRefreshService = class OwnerJwtRefreshService {
    constructor(jwtService, ownerService, mailService, sheduleService, ownerRefreshTokenRepository) {
        this.jwtService = jwtService;
        this.ownerService = ownerService;
        this.mailService = mailService;
        this.sheduleService = sheduleService;
        this.ownerRefreshTokenRepository = ownerRefreshTokenRepository;
    }
    generateRefreshToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ownerRefreshToken = this.jwtService.sign(payload);
                return ownerRefreshToken;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SIGNING_TOKEN);
            }
        });
    }
    validateRefreshToken(ownerRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ownerData = this.jwtService.verify(ownerRefreshToken);
                if (!ownerData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
                }
                return ownerData;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_VALIDATING_TOKEN);
            }
        });
    }
    saveToken(ownerId, ownerRefreshToken, email, ownerAgent, phoneNumber, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const owner = yield this.ownerService.getOwnerById(ownerId);
                if (!owner) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_NOT_FOUND);
                }
                const tokenData = yield this.ownerRefreshTokenRepository.findOne({
                    where: { ownerId: ownerId },
                });
                if (tokenData) {
                    tokenData.ownerRefreshToken = ownerRefreshToken;
                    if (owner.getOwnerAgent() && owner.getOwnerAgent() !== ownerAgent) {
                        owner.setIsActivated(false);
                    }
                    return tokenData.save();
                }
                const token = yield this.ownerRefreshTokenRepository.create({
                    ownerRefreshToken: ownerRefreshToken,
                    ownerId: ownerId,
                    email: email,
                    ownerAgent: ownerAgent,
                    phoneNumber: phoneNumber,
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
    removeToken(ownerRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.findToken(ownerRefreshToken);
                if (!token) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                const tokenData = yield this.ownerRefreshTokenRepository.destroy({
                    where: { ownerRefreshToken: ownerRefreshToken },
                });
                return tokenData;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_REMOVING_TOKEN);
            }
        });
    }
    findTokenByToken(ownerRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ownerRefreshTokenRepository.findOne({
                where: { ownerRefreshToken: ownerRefreshToken },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
            }
            return token;
        });
    }
    findToken(ownerRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ownerRefreshTokenRepository.findOne({
                where: { ownerRefreshToken: ownerRefreshToken },
            });
            if (!token) {
                return false;
            }
            return token;
        });
    }
    findTokenByParams(email, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ownerRefreshTokenRepository.findOne({
                where: { email: email, phoneNumber: phoneNumber },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
            }
            return token;
        });
    }
    removeTokenInTime(ownerRefreshTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield owner_refresh_token_model_1.OwnerRefreshToken.findByPk(ownerRefreshTokenId);
            if (!token) {
                return false;
            }
            return owner_refresh_token_model_1.OwnerRefreshToken.destroy({
                where: {
                    id: token.id,
                    phoneNumber: token.phoneNumber,
                },
            });
        });
    }
};
OwnerJwtRefreshService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(4, (0, sequelize_1.InjectModel)(owner_refresh_token_model_1.OwnerRefreshToken)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        owner_service_1.OwnerService,
        mail_service_1.MailService,
        scedule_service_1.TasksService, Object])
], OwnerJwtRefreshService);
exports.OwnerJwtRefreshService = OwnerJwtRefreshService;
//# sourceMappingURL=jwt-refresh.service.js.map