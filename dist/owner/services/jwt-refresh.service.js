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
var OwnerJwtRefreshService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerJwtRefreshService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const crypto_1 = require("crypto");
const util_1 = require("util");
const uuid_1 = require("uuid");
const api_exception_1 = require("../../common/exceptions/api.exception");
const scedule_service_1 = require("../../core/services/scedule.service");
const mail_service_1 = require("../../mail/mail.service");
const jwt_refresh_constants_1 = require("../constants/jwt-refresh.constants");
const owner_constants_1 = require("../constants/owner.constants");
const owner_refresh_token_model_1 = require("../models/owner.refresh.token.model");
const owner_service_1 = require("./owner.service");
let OwnerJwtRefreshService = OwnerJwtRefreshService_1 = class OwnerJwtRefreshService {
    constructor(jwtService, ownerService, mailService, sheduleService, ownerRefreshTokenRepository) {
        this.jwtService = jwtService;
        this.ownerService = ownerService;
        this.mailService = mailService;
        this.sheduleService = sheduleService;
        this.ownerRefreshTokenRepository = ownerRefreshTokenRepository;
        this.Logger = new common_1.Logger(OwnerJwtRefreshService_1.name);
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
    insertToken(ownerId, ownerRefreshToken, email, ownerAgent, phoneNumber, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const owner = yield this.ownerService.getOwnerById(ownerId);
                if (!owner) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_NOT_FOUND);
                }
                const token = yield this.ownerRefreshTokenRepository.create({
                    ownerRefreshToken: ownerRefreshToken,
                    ownerId: owner.id,
                    email: email,
                    ownerAgent: ownerAgent,
                    phoneNumber: phoneNumber,
                });
                token.setIdentifier((0, uuid_1.v4)());
                yield token.save();
                if (!token.getExpireDate()) {
                    token.setExpireDate(expireDate);
                    yield token.save();
                }
                if (!owner.getOwnerRefreshTokens() || owner.getOwnerRefreshTokens().length === 0) {
                    owner.$set('ownerRefreshTokens', token.id);
                    owner.ownerRefreshTokens = [token];
                }
                else {
                    owner.$add('ownerRefreshTokens', token.id);
                }
                return token;
            }
            catch (err) {
                console.log(err);
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SAVING_TOKEN);
            }
        });
    }
    saveToken(ownerId, ownerRefreshToken, email, ownerAgent, phoneNumber, expireDate, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const owner = yield this.ownerService.getOwnerById(ownerId);
                if (!owner) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_NOT_FOUND);
                }
                const tokenData = yield this.ownerRefreshTokenRepository.findOne({
                    where: {
                        ownerId: ownerId,
                        identifier: identifier,
                    },
                });
                if (tokenData && !owner.getOwnerAgent()) {
                    owner.setOwnerAgent(ownerAgent);
                    tokenData.setownerAgent(ownerAgent);
                    yield owner.save();
                    yield tokenData.save();
                }
                if (tokenData) {
                    tokenData.ownerRefreshToken = ownerRefreshToken;
                    if (owner.getOwnerAgent() && owner.getOwnerAgent().trim() !== ownerAgent) {
                        owner.setIsActivated(false);
                        const link = yield this.generateEncryptedValue('OWNER', 16);
                        const code = this.generateActivationCode();
                        owner.setResetToken(link.replace('/', `${(0, uuid_1.v4)()}`).replace('=', `${(0, uuid_1.v4)()}`));
                        owner.setActivationCode(code);
                        owner.setResetTokenExpiration(Number(Date.now() + 3600000));
                        yield owner.save();
                        this.Logger.log(`checking owner with email ${owner.email}`, owner.getOwnerAgent() !== ownerAgent);
                        this.mailService.sendActivationMailToOwner(owner.email, `${process.env.API_URL}/auth/activate/${owner.getResetToken().trim()}?code=${code}`);
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
                const owner = yield this.ownerService.getOwnerById(token.ownerId);
                owner.$remove('ownerRefreshTokens', token.token.id);
                yield owner.save();
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
    findTokenByToken(ownerRefreshToken, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ownerRefreshTokenRepository.findOne({
                where: {
                    ownerRefreshToken: ownerRefreshToken,
                    identifier: identifier,
                },
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
            return { token: token, ownerId: token.ownerId };
        });
    }
    findTokenByParams(email, phoneNumber, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ownerRefreshTokenRepository.findOne({
                where: { email: email, phoneNumber: phoneNumber, identifier: identifier },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
            }
            return token;
        });
    }
    removeTokenInTime(ownerRefreshTokenId, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield owner_refresh_token_model_1.OwnerRefreshToken.findOne({
                where: {
                    id: ownerRefreshTokenId,
                    identifier: identifier,
                }
            });
            if (!token) {
                return false;
            }
            const owner = yield this.ownerService.getOwnerById(token.ownerId);
            owner.$remove('ownerRefreshTokens', token.id);
            yield owner.save();
            return owner_refresh_token_model_1.OwnerRefreshToken.destroy({
                where: {
                    id: token.id,
                    phoneNumber: token.phoneNumber,
                    identifier: identifier,
                },
            });
        });
    }
    generateEncryptedValue(value, bytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const iv = (0, crypto_1.randomBytes)(bytes);
            const API_KEY = process.env.API_KEY.toString();
            const key = (yield (0, util_1.promisify)(crypto_1.scrypt)(API_KEY, 'salt', 32));
            const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
            return Buffer.concat([cipher.update(value), cipher.final()]).toString('base64');
        });
    }
    generateActivationCode() {
        const confirmCode = Number(('' + Math.random()).substring(2, 10));
        return confirmCode;
    }
};
OwnerJwtRefreshService = OwnerJwtRefreshService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(4, (0, sequelize_1.InjectModel)(owner_refresh_token_model_1.OwnerRefreshToken)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        owner_service_1.OwnerService,
        mail_service_1.MailService,
        scedule_service_1.TasksService, Object])
], OwnerJwtRefreshService);
exports.OwnerJwtRefreshService = OwnerJwtRefreshService;
//# sourceMappingURL=jwt-refresh.service.js.map