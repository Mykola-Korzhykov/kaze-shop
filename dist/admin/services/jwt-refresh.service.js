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
exports.AdminJwtRefreshService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_refresh_constants_1 = require("../constants/jwt-refresh.constants");
const admin_refresh_token_model_1 = require("../models/admin.refresh.token.model");
const admin_service_1 = require("./admin.service");
const mail_service_1 = require("../../mail/mail.service");
const sequelize_1 = require("@nestjs/sequelize");
const scedule_service_1 = require("../../core/services/scedule.service");
const api_exception_1 = require("../../common/exceptions/api.exception");
let AdminJwtRefreshService = class AdminJwtRefreshService {
    constructor(jwtService, adminService, sheduleService, mailService, adminRefreshTokenRepository) {
        this.jwtService = jwtService;
        this.adminService = adminService;
        this.sheduleService = sheduleService;
        this.mailService = mailService;
        this.adminRefreshTokenRepository = adminRefreshTokenRepository;
    }
    generateRefreshToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminRefreshToken = this.jwtService.sign(payload);
                return adminRefreshToken;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SIGNING_TOKEN);
            }
        });
    }
    validateRefreshToken(adminRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminData = this.jwtService.verify(adminRefreshToken);
                if (!adminData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
                }
                return adminData;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_VALIDATING_TOKEN);
            }
        });
    }
    saveToken(adminId, adminRefreshToken, email, adminAgent, phoneNumber, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.adminService.getAdminById(adminId);
                if (!admin) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.ADMIN_NOT_FOUND);
                }
                const tokenData = yield this.adminRefreshTokenRepository.findOne({
                    where: { adminId: adminId },
                });
                if (tokenData) {
                    tokenData.adminRefreshToken = adminRefreshToken;
                    if (admin.getAdminAgent() && admin.getAdminAgent() !== adminAgent) {
                        admin.setIsActivated(false);
                    }
                    return tokenData.save();
                }
                const token = yield this.adminRefreshTokenRepository.create({
                    adminRefreshToken: adminRefreshToken,
                    adminId: adminId,
                    email: email,
                    adminAgent: adminAgent,
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
    removeToken(adminRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.findToken(adminRefreshToken);
                if (!token) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                const tokenData = yield this.adminRefreshTokenRepository.destroy({
                    where: { adminRefreshToken: adminRefreshToken },
                });
                return tokenData;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_REMOVING_TOKEN);
            }
        });
    }
    findToken(adminRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.adminRefreshTokenRepository.findOne({
                where: { adminRefreshToken: adminRefreshToken },
            });
            if (!token) {
                return false;
            }
            return token;
        });
    }
    findTokenByToken(adminRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.adminRefreshTokenRepository.findOne({
                where: { adminRefreshToken: adminRefreshToken },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
            }
            return token;
        });
    }
    findTokenByParams(email, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.adminRefreshTokenRepository.findOne({
                where: { email: email, phoneNumber: phoneNumber },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
            }
            return token;
        });
    }
    removeTokenInTime(adminRefreshTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield admin_refresh_token_model_1.AdminRefreshToken.findByPk(adminRefreshTokenId);
            if (!token) {
                return false;
            }
            return this.adminRefreshTokenRepository.destroy({
                where: {
                    id: token.id,
                    phoneNumber: token.phoneNumber,
                },
            });
        });
    }
};
AdminJwtRefreshService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(4, (0, sequelize_1.InjectModel)(admin_refresh_token_model_1.AdminRefreshToken)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        admin_service_1.AdminService,
        scedule_service_1.TasksService,
        mail_service_1.MailService, Object])
], AdminJwtRefreshService);
exports.AdminJwtRefreshService = AdminJwtRefreshService;
//# sourceMappingURL=jwt-refresh.service.js.map