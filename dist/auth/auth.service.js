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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("./auth.constants");
const crypto_1 = require("crypto");
const util_1 = require("util");
const jwt_1 = require("@nestjs/jwt");
const signup_dto_1 = require("./dto/signup.dto");
const mail_service_1 = require("../mail/mail.service");
const admin_service_1 = require("../admin/services/admin.service");
const owner_service_1 = require("../owner/services/owner.service");
const jwt_refresh_service_1 = require("../users/services/jwt-refresh.service");
const users_service_1 = require("../users/services/users.service");
const jwt_refresh_service_2 = require("../owner/services/jwt-refresh.service");
const jwt_refresh_service_3 = require("../admin/services/jwt-refresh.service");
const user_model_1 = require("../users/models/user.model");
const owner_model_1 = require("../owner/models/owner.model");
const admin_model_1 = require("../admin/models/admin.model");
const user_constants_1 = require("../users/constants/user.constants");
const change_password_dto_1 = require("./dto/change.password.dto");
const uuid_1 = require("uuid");
const scedule_service_1 = require("../core/services/scedule.service");
const api_exception_1 = require("../common/exceptions/api.exception");
const jwt_refresh_constants_1 = require("../admin/constants/jwt-refresh.constants");
let AuthService = class AuthService {
    constructor(ownerJwtRefreshTokenService, adminJwtRefreshTokenService, ownerService, adminService, userService, mailService, sheduleService, jwtService, userJwtRefreshTokenService) {
        this.ownerJwtRefreshTokenService = ownerJwtRefreshTokenService;
        this.adminJwtRefreshTokenService = adminJwtRefreshTokenService;
        this.ownerService = ownerService;
        this.adminService = adminService;
        this.userService = userService;
        this.mailService = mailService;
        this.sheduleService = sheduleService;
        this.jwtService = jwtService;
        this.userJwtRefreshTokenService = userJwtRefreshTokenService;
    }
    login(userDto, response, request, next, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = request.headers.authorization;
                if (!authHeader) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                const user = yield this.authenticateUser(userDto, userAgent, false);
                const tokens = yield this.generateTokens(user, userAgent, true);
                yield this.activateUser(user, response);
                response.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: Number(tokens.expireDate),
                    path: request.path,
                    httpOnly: true,
                    expires: tokens.expireDate,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: 'strict',
                });
                return response.json(Object.assign({}, this.setResponse(tokens, user)));
            }
            catch (error) {
                return next(error);
            }
        });
    }
    signup(userDto, response, request, next, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = request.headers.authorization;
                const bearer = authHeader.split(' ')[0];
                if (!authHeader || bearer !== 'Bearer') {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                const user = yield this.authenticateUser(userDto, userAgent, true);
                const tokens = yield this.generateTokens(user, userAgent, true);
                yield this.activateUser(user, response);
                response.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: Number(tokens.expireDate),
                    path: request.path,
                    httpOnly: true,
                    expires: tokens.expireDate,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: 'strict',
                });
                return response.json(Object.assign({}, this.setResponse(tokens, user)));
            }
            catch (error) {
                return next(error);
            }
        });
    }
    logout(response, request, next, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = request.headers.authorization;
                const bearer = authHeader.split(' ')[0];
                if (!authHeader || bearer !== 'Bearer') {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                const refreshToken = request === null || request === void 0 ? void 0 : request.cookies['refreshToken'];
                const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
                response.clearCookie('refreshToken');
                let logout;
                if (type && type === 'OWNER') {
                    response.clearCookie('user-id');
                    logout = yield this.ownerJwtRefreshTokenService.removeToken(decodedToken);
                    return response.json({ logout });
                }
                if (type && type === 'ADMIN') {
                    response.clearCookie('user-id');
                    logout = yield this.adminJwtRefreshTokenService.removeToken(decodedToken);
                    return response.json({ logout });
                }
                logout = yield this.userJwtRefreshTokenService.removeToken(decodedToken);
                return response.json({ logout });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    refresh(response, request, next, type, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = request === null || request === void 0 ? void 0 : request.cookies['refreshToken'];
                if (!refreshToken) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                const user = yield this.validateRefreshToken(refreshToken, type);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                yield this.activateUser(user, response);
                const tokens = yield this.generateTokens(user, userAgent, false);
                response.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: Number(tokens.expireDate),
                    path: request.path,
                    httpOnly: true,
                    expires: tokens.expireDate,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: 'strict',
                });
                return response.json(Object.assign({}, this.setResponse(tokens, user)));
            }
            catch (error) {
                return next(error);
            }
        });
    }
    activate(request, response, next, activationLink, code, type, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.setIsActivated(type, code, activationLink, request);
                response.redirect(process.env.CLIENT_URL.toString());
                yield this.activateUser(user, response);
                const tokens = yield this.generateTokens(user, userAgent, false);
                if (user instanceof admin_model_1.Admin || user instanceof admin_model_1.Admin) {
                    user.activationLink = (0, uuid_1.v4)();
                    yield user.save();
                }
                response.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: Number(tokens.expireDate),
                    expires: tokens.expireDate,
                    httpOnly: true,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: 'strict',
                });
                return response.json(Object.assign({}, this.setResponse(tokens, user)));
            }
            catch (error) {
                return next(error);
            }
        });
    }
    setCode(codeDto, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!locale) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.LANGUAGE_NOT_PROVIDED);
            }
            const code = this.generateConfirmCode();
            if ((codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) && (codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) === 'OWNER') {
                const email = yield this.ownerService.setConfirmCode(codeDto, code);
                yield this.mailService.sendCode(email, code, locale);
                return email;
            }
            if ((codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) && (codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) === 'ADMIN') {
                const email = yield this.adminService.setConfirmCode(codeDto, code);
                yield this.mailService.sendCode(email, code, locale);
                return email;
            }
            const email = yield this.userService.setConfirmCode(codeDto, code);
            yield this.mailService.sendCode(email, code, locale);
            return email;
        });
    }
    resetPassword(resetDto, codeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) && (codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) === 'OWNER') {
                return this.ownerService.resetPassword(resetDto);
            }
            if ((codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) && (codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) === 'ADMIN') {
                return this.adminService.resetPassword(resetDto);
            }
            return this.userService.resetPassword(resetDto);
        });
    }
    changePassword(response, request, next, changeDto, userId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type && type === 'OWNER') {
                yield this.ownerService.changePassword(userId, changeDto.password);
            }
            if (type && type === 'ADMIN') {
                yield this.adminService.changePassword(userId, changeDto.password);
            }
            if (!type) {
                yield this.userService.changePassword(userId, changeDto.password);
            }
            return this.logout(response, request, next, type);
        });
    }
    validateAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = this.jwtService.verify(token);
                return userData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateConfirmCode() {
        const confirmCode = Number(('' + Math.random()).substring(2, 10));
        return confirmCode;
    }
    generateAccessToken(payload) {
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
    }
    setResponse(tokens, user) {
        if (user instanceof owner_model_1.Owner) {
            return {
                accessToken: tokens.accessToken,
                owner: {
                    id: user.id,
                    name: user.getName(),
                    surname: user.getSurname(),
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                },
                type: 'OWNER',
            };
        }
        if (user instanceof admin_model_1.Admin) {
            return {
                accessToken: tokens.accessToken,
                admin: {
                    id: user.id,
                    name: user.getName(),
                    surname: user.getSurname(),
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                },
                type: 'ADMIN',
            };
        }
        return {
            accessToken: tokens.accessToken,
            user: {
                id: user.id,
                name: user.getName(),
                surname: user.getSurname(),
                phoneNumber: user.phoneNumber,
                email: user.email,
                country: user.getCountry(),
                city: user.getCity(),
                postOffice: user.getPostOffice(),
            },
        };
    }
    generateTokens(user, userAgent, setTimeouts) {
        return __awaiter(this, void 0, void 0, function* () {
            let accessToken;
            let refreshToken;
            let dbToken;
            if (user instanceof user_model_1.User) {
                accessToken = this.generateAccessToken({
                    userId: user.id,
                    isUserActivated: user.getIsActivated(),
                    email: user.email,
                    roles: user.roles,
                });
                refreshToken = yield this.userJwtRefreshTokenService.generateRefreshToken({
                    userId: user.id,
                    isActivated: user.getIsActivated(),
                    email: user.email,
                    roles: user.roles,
                });
                dbToken = yield this.userJwtRefreshTokenService.saveToken(user.id, refreshToken, user.email, userAgent, new Date(new Date().setDate(new Date().getDate() + 7)));
            }
            if (user instanceof admin_model_1.Admin) {
                accessToken = this.generateAccessToken({
                    userId: user.id,
                    isUserActivated: user.getIsActivated(),
                    userActivationLink: user.activationLink,
                    email: user.email,
                    roles: user.roles,
                });
                refreshToken =
                    yield this.adminJwtRefreshTokenService.generateRefreshToken({
                        isActivated: user.getIsActivated(),
                        email: user.email,
                        adminId: user.id,
                        adminAgent: userAgent,
                        roles: user.roles,
                    });
                dbToken = yield this.adminJwtRefreshTokenService.saveToken(user.id, refreshToken, user.email, userAgent, user.phoneNumber, new Date(new Date().setDate(new Date().getDate() + 2)));
            }
            if (user instanceof owner_model_1.Owner) {
                accessToken = this.generateAccessToken({
                    userId: user.id,
                    isUserActivated: user.getIsActivated(),
                    userActivationLink: user.activationLink,
                    email: user.email,
                    roles: user.roles,
                });
                refreshToken =
                    yield this.ownerJwtRefreshTokenService.generateRefreshToken({
                        isActivated: user.getIsActivated(),
                        email: user.email,
                        ownerId: user.id,
                        ownerAgent: userAgent,
                        roles: user.roles,
                    });
                dbToken = yield this.ownerJwtRefreshTokenService.saveToken(user.id, refreshToken, user.email, userAgent, user.phoneNumber, new Date(new Date().setDate(new Date().getDate() + 1)));
            }
            if (setTimeouts) {
                this.setTimeouts(user, refreshToken);
            }
            const encodedRefreshToken = Buffer.from(refreshToken, 'utf8').toString('base64');
            const encodedAccessToken = Buffer.from(accessToken, 'utf8').toString('base64');
            return {
                expireDate: dbToken.getExpireDate(),
                refreshToken: encodedRefreshToken,
                accessToken: encodedAccessToken,
            };
        });
    }
    authenticateUser(userDto, userAgent, isNew) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.ownerService.validateOwner({
                email: userDto.email,
                password: userDto.password,
            });
            if (owner instanceof owner_model_1.Owner && !owner.getOwnerAgent()) {
                owner.setOwnerAgent(userAgent);
                yield owner.save();
            }
            if (owner && owner instanceof owner_model_1.Owner) {
                return owner;
            }
            const admin = yield this.adminService.validateAdmin({
                email: userDto.email,
                password: userDto.password,
            });
            if (admin instanceof admin_model_1.Admin && !admin.getAdminAgent()) {
                admin.setAdminAgent(userAgent);
                yield admin.save();
            }
            if (admin && admin instanceof admin_model_1.Admin) {
                return admin;
            }
            if (isNew &&
                'name' in userDto &&
                'surname' in userDto &&
                'phoneNumber' in userDto &&
                'email' in userDto &&
                'password' in userDto &&
                'confirmPassword' in userDto) {
                const user = yield this.userService.initializeUser(userDto);
                return user;
            }
            const user = yield this.userService.validateUser(userDto);
            console.log('done!');
            if (user instanceof user_model_1.User) {
                return user;
            }
            throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
        });
    }
    validateRefreshToken(refreshToken, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
            if (type && type === 'OWNER') {
                const ownerData = yield this.ownerJwtRefreshTokenService.validateRefreshToken(decodedToken);
                if (!ownerData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.OWNER_NOT_AUTHORIZIED);
                }
                const owner = yield this.ownerService.getOwnerById(ownerData.ownerId);
                return owner;
            }
            if (type && type === 'ADMIN') {
                const adminData = yield this.adminJwtRefreshTokenService.validateRefreshToken(decodedToken);
                if (!adminData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.ADMIN_NOT_AUTHORIZIED);
                }
                const admin = yield this.adminService.getAdminById(adminData.adminId);
                return admin;
            }
            const userData = yield this.userJwtRefreshTokenService.validateRefreshToken(decodedToken);
            if (!userData) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            const user = yield this.userService.getUserById(userData.userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            return user;
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
    activateUser(user, response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user instanceof user_model_1.User) {
                return;
            }
            if (user instanceof owner_model_1.Owner) {
                user.activationLink = (0, uuid_1.v4)();
                yield user.save();
                response.cookie('user-id', user.activationLink, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    signed: true,
                    httpOnly: true,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: 'strict',
                });
            }
            if (user instanceof admin_model_1.Admin) {
                user.activationLink = (0, uuid_1.v4)();
                yield user.save();
                response.cookie('user-id', user.activationLink, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    signed: true,
                    httpOnly: true,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: 'strict',
                });
            }
            if (user instanceof owner_model_1.Owner && !user.getIsActivated()) {
                const link = yield this.generateEncryptedValue('OWNER', 16);
                const code = this.generateConfirmCode();
                user.setResetToken(link);
                user.setActivationCode(code);
                user.setResetTokenExpiration(Number(Date.now() + 3600000));
                yield user.save();
                return this.mailService.sendActivationMail(user.email, `${process.env.API_URL}/kaze_shop/auth/activate/${link}?code=${code}`);
            }
            if (user instanceof admin_model_1.Admin && !user.getIsActivated()) {
                const link = yield this.generateEncryptedValue('ADMIN', 16);
                const code = this.generateConfirmCode();
                user.setResetToken(link);
                user.setActivationCode(code);
                user.setResetTokenExpiration(Number(Date.now() + 3600000));
                yield user.save();
                return this.mailService.sendActivationMail(user.email, `${process.env.API_URL}/kaze_shop/auth/activate/${link}?code=${code}`);
            }
            return;
        });
    }
    setIsActivated(type, code, activationLink, request) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (type && type === 'OWNER') {
                user = yield this.ownerService.findByActivationLink(request['activationLink']);
            }
            if (type && type === 'ADMIN') {
                user = yield this.adminService.findByActivationLink(request['activationLink']);
            }
            if (!user || activationLink !== user.resetToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            if (Number(Date.now()) >= user.getResetTokenExpiration() &&
                code !== user.getActivationCode()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.ACTIVATION_EXPIRED);
            }
            user.setIsActivated(true);
            return user.save();
        });
    }
    setTimeouts(user, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user instanceof user_model_1.User) {
                const refreshData = yield this.userJwtRefreshTokenService.findToken(refreshToken);
                if (!refreshData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                return this.sheduleService.addTimeoutForTokens(`delete-user-refresh-token,: ${(0, uuid_1.v4)()}`, Number(process.env.USER_DELAY), refreshData.id, this.adminJwtRefreshTokenService.removeTokenInTime);
            }
            if (user instanceof admin_model_1.Admin) {
                const refreshData = yield this.adminJwtRefreshTokenService.findTokenByToken(refreshToken);
                if (!refreshData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                return this.sheduleService.addTimeoutForTokens(`delete-admin-refresh-token: ${(0, uuid_1.v4)()}`, Number(process.env.ADMIN_DELAY), refreshData.id, this.adminJwtRefreshTokenService.removeTokenInTime);
            }
            if (user instanceof owner_model_1.Owner) {
                const refreshData = yield this.ownerJwtRefreshTokenService.findTokenByToken(refreshToken);
                if (!refreshData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                return this.sheduleService.addTimeoutForTokens(`delete-owner-refresh-token: ${(0, uuid_1.v4)()}`, Number(process.env.OWNER_DELAY), refreshData.id, this.ownerJwtRefreshTokenService.removeTokenInTime);
            }
        });
    }
};
__decorate([
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto, Object, Object, Function, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signup", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "logout", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, String, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "refresh", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, String, Number, String, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "activate", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, change_password_dto_1.ChangeDto, Number, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "changePassword", null);
AuthService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [jwt_refresh_service_2.OwnerJwtRefreshService,
        jwt_refresh_service_3.AdminJwtRefreshService,
        owner_service_1.OwnerService,
        admin_service_1.AdminService,
        users_service_1.UsersService,
        mail_service_1.MailService,
        scedule_service_1.TasksService,
        jwt_1.JwtService,
        jwt_refresh_service_1.UserJwtRefreshTokenService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map