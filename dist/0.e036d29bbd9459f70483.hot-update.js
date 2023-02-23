"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 13:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var AuthService_1;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(7);
const auth_constants_1 = __webpack_require__(12);
const crypto_1 = __webpack_require__(14);
const util_1 = __webpack_require__(15);
const jwt_1 = __webpack_require__(16);
const signup_dto_1 = __webpack_require__(17);
const express_1 = __webpack_require__(20);
const mail_service_1 = __webpack_require__(21);
const admin_service_1 = __webpack_require__(58);
const owner_service_1 = __webpack_require__(59);
const jwt_refresh_service_1 = __webpack_require__(67);
const users_service_1 = __webpack_require__(24);
const jwt_refresh_service_2 = __webpack_require__(72);
const jwt_refresh_service_3 = __webpack_require__(73);
const user_model_1 = __webpack_require__(35);
const owner_model_1 = __webpack_require__(31);
const admin_model_1 = __webpack_require__(28);
const user_constants_1 = __webpack_require__(50);
const change_password_dto_1 = __webpack_require__(74);
const uuid_1 = __webpack_require__(60);
const api_exception_1 = __webpack_require__(52);
const jwt_refresh_constants_1 = __webpack_require__(55);
const event_emitter_1 = __webpack_require__(69);
const schedule_1 = __webpack_require__(61);
const jwt_refresh_token_deleted_evet_1 = __webpack_require__(71);
let AuthService = AuthService_1 = class AuthService {
    constructor(ownerJwtRefreshTokenService, adminJwtRefreshTokenService, ownerService, adminService, userService, mailService, schedulerRegistry, eventEmitter, jwtService, userJwtRefreshTokenService) {
        this.ownerJwtRefreshTokenService = ownerJwtRefreshTokenService;
        this.adminJwtRefreshTokenService = adminJwtRefreshTokenService;
        this.ownerService = ownerService;
        this.adminService = adminService;
        this.userService = userService;
        this.mailService = mailService;
        this.schedulerRegistry = schedulerRegistry;
        this.eventEmitter = eventEmitter;
        this.jwtService = jwtService;
        this.userJwtRefreshTokenService = userJwtRefreshTokenService;
        this.Logger = new common_1.Logger(AuthService_1.name);
    }
    login(userDto, response, request, next, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = request.headers.authorization;
                if (!authHeader) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                const user = yield this.authenticateUser(userDto, userAgent, false);
                const tokens = yield this.generateTokens(user, userAgent);
                yield this.activateUser(user, response);
                response.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: Number(tokens.expireDate),
                    path: '/',
                    httpOnly: true,
                    expires: tokens.expireDate,
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
                const tokens = yield this.generateTokens(user, userAgent);
                yield this.activateUser(user, response);
                response.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: Number(tokens.expireDate),
                    path: '/',
                    httpOnly: true,
                    expires: tokens.expireDate,
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
                let logout;
                if (type && type === 'OWNER') {
                    response.clearCookie('user-id');
                    response.clearCookie('refreshToken');
                    logout = yield this.ownerJwtRefreshTokenService.removeToken(decodedToken);
                    return response.json({ logout });
                }
                if (type && type === 'ADMIN') {
                    response.clearCookie('user-id');
                    response.clearCookie('refreshToken');
                    logout = yield this.adminJwtRefreshTokenService.removeToken(decodedToken);
                    return response.json({ logout });
                }
                logout = yield this.userJwtRefreshTokenService.removeToken(decodedToken);
                response.clearCookie('refreshToken');
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
                const dto = yield this.validateRefreshToken(refreshToken, type);
                if (!dto.user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                const tokens = yield this.refreshTokens(dto.user, userAgent, dto.identifier);
                response.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: Number(tokens.expireDate),
                    path: '/',
                    httpOnly: true,
                    expires: tokens.expireDate,
                    sameSite: 'strict',
                });
                yield this.activateUser(dto.user, response);
                return response.json(Object.assign({}, this.setResponse(tokens, dto.user)));
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
                yield this.activateUser(user, response);
                return response.redirect(process.env.CLIENT_URL.toString());
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
                user: {
                    id: user.id,
                    name: user.getName(),
                    surname: user.getSurname(),
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    type: 'OWNER',
                },
            };
        }
        if (user instanceof admin_model_1.Admin) {
            return {
                accessToken: tokens.accessToken,
                user: {
                    id: user.id,
                    name: user.getName(),
                    surname: user.getSurname(),
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    type: 'ADMIN',
                },
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
                type: 'USER',
            },
        };
    }
    generateTokens(user, userAgent) {
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
                dbToken = yield this.userJwtRefreshTokenService.insertToken(user.id, refreshToken, user.email, userAgent, new Date(new Date().setDate(new Date().getDate() + 7)));
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
                dbToken = yield this.adminJwtRefreshTokenService.insertToken(user.id, refreshToken, user.email, userAgent, user.phoneNumber, new Date(new Date().setDate(new Date().getDate() + 2)));
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
                dbToken = yield this.ownerJwtRefreshTokenService.insertToken(user.id, refreshToken, user.email, userAgent, user.phoneNumber, new Date(new Date().setDate(new Date().getDate() + 1)));
            }
            const encodedRefreshToken = Buffer.from(refreshToken, 'utf8').toString('base64');
            const encodedAccessToken = Buffer.from(accessToken, 'utf8').toString('base64');
            this.setTimeouts(user, refreshToken, dbToken.identifier);
            return {
                expireDate: dbToken.getExpireDate(),
                refreshToken: encodedRefreshToken,
                accessToken: encodedAccessToken,
            };
        });
    }
    refreshTokens(user, userAgent, identifier) {
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
                dbToken = yield this.userJwtRefreshTokenService.saveToken(user.id, refreshToken, user.email, userAgent, new Date(new Date().setDate(new Date().getDate() + 7)), identifier);
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
                dbToken = yield this.adminJwtRefreshTokenService.saveToken(user.id, refreshToken, user.email, userAgent, user.phoneNumber, new Date(new Date().setDate(new Date().getDate() + 2)), identifier);
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
                dbToken = yield this.ownerJwtRefreshTokenService.saveToken(user.id, refreshToken, user.email, userAgent, user.phoneNumber, new Date(new Date().setDate(new Date().getDate() + 1)), identifier);
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
                const dbToken = yield this.ownerJwtRefreshTokenService.findToken(decodedToken);
                if (!dbToken) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.OWNER_NOT_AUTHORIZIED);
                }
                return {
                    user: owner,
                    identifier: dbToken.token.getIdentifier(),
                };
            }
            if (type && type === 'ADMIN') {
                const adminData = yield this.adminJwtRefreshTokenService.validateRefreshToken(decodedToken);
                if (!adminData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.ADMIN_NOT_AUTHORIZIED);
                }
                const admin = yield this.adminService.getAdminById(adminData.adminId);
                const dbToken = yield this.adminJwtRefreshTokenService.findToken(decodedToken);
                if (!dbToken) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.OWNER_NOT_AUTHORIZIED);
                }
                return {
                    user: admin,
                    identifier: dbToken.token.getIdentifier(),
                };
            }
            const userData = yield this.userJwtRefreshTokenService.validateRefreshToken(decodedToken);
            if (!userData) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            const user = yield this.userService.getUserById(userData.userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            const dbToken = yield this.userJwtRefreshTokenService.findToken(decodedToken);
            if (!dbToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.OWNER_NOT_AUTHORIZIED);
            }
            return {
                user: user,
                identifier: dbToken.token.getIdentifier(),
            };
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
            if (user instanceof admin_model_1.Admin) {
                response.cookie('user-id', user.activationLink, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    signed: true,
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                });
            }
            if (user instanceof admin_model_1.Admin && !user.getIsActivated()) {
                const link = yield this.generateEncryptedValue('ADMIN', 16);
                const code = this.generateConfirmCode();
                user.setResetToken(link.replace('/', `${(0, uuid_1.v4)()}`).replace('=', `${(0, uuid_1.v4)()}`));
                user.setActivationCode(code);
                user.setResetTokenExpiration(Number(Date.now() + 3600000));
                yield user.save();
                return this.mailService.sendActivationMailToAdmin(user.email, `${process.env.API_URL}/auth/activate/${user
                    .getResetToken()
                    .trim()}?code=${code}`);
            }
            if (user instanceof owner_model_1.Owner) {
                response.cookie('user-id', user.activationLink, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    signed: true,
                    httpOnly: true,
                    sameSite: 'strict',
                    path: '/',
                });
            }
            if (user instanceof owner_model_1.Owner && !user.getIsActivated()) {
                const link = yield this.generateEncryptedValue('OWNER', 16);
                const code = this.generateConfirmCode();
                user.setResetToken(link.replace('/', `${(0, uuid_1.v4)()}`).replace('=', `${(0, uuid_1.v4)()}`));
                user.setActivationCode(code);
                user.setResetTokenExpiration(Number(Date.now() + 3600000));
                yield user.save();
                this.Logger.log(`activating owner with email ${user.email}`);
                return this.mailService.sendActivationMailToOwner(user.email, `${process.env.API_URL}/auth/activate/${user
                    .getResetToken()
                    .trim()}?code=${code}`);
            }
            return;
        });
    }
    setIsActivated(type, code, activationLink, request) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (type && type === 'OWNER') {
                user = yield this.ownerService.findByActivationLink(request['activationLink']);
                user.setOwnerAgent(null);
                yield user.save();
            }
            if (type && type === 'ADMIN') {
                user = yield this.adminService.findByActivationLink(request['activationLink']);
                user.setAdminAgent(null);
                yield user.save();
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
    setTimeouts(user, refreshToken, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user instanceof user_model_1.User) {
                const refreshData = yield this.userJwtRefreshTokenService.findTokenByToken(refreshToken, identifier);
                if (!refreshData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                return this.addTimeoutForTokens(`delete-user-refresh-token,: ${(0, uuid_1.v4)()}`, Number(process.env.USER_DELAY), refreshData.id, identifier, this.userJwtRefreshTokenService.removeTokenInTime);
            }
            if (user instanceof admin_model_1.Admin) {
                const refreshData = yield this.adminJwtRefreshTokenService.findTokenByToken(refreshToken, identifier);
                if (!refreshData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                return this.addTimeoutForTokens(`delete-admin-refresh-token: ${(0, uuid_1.v4)()}`, Number(process.env.ADMIN_DELAY), refreshData.id, identifier, this.adminJwtRefreshTokenService.removeTokenInTime);
            }
            if (user instanceof owner_model_1.Owner) {
                const refreshData = yield this.ownerJwtRefreshTokenService.findTokenByToken(refreshToken, identifier);
                if (!refreshData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                return this.addTimeoutForTokens(`delete-owner-refresh-token: ${(0, uuid_1.v4)()}`, Number(process.env.OWNER_DELAY), refreshData.id, identifier, this.ownerJwtRefreshTokenService.removeTokenInTime);
            }
        });
    }
    addTimeoutForTokens(name, milliseconds, refreshTokenId, identifier, cb) {
        const callback = () => __awaiter(this, void 0, void 0, function* () {
            this.Logger.log(`Timeout ${name} executing after (${milliseconds})!`);
            const timeout = yield cb(refreshTokenId, identifier);
            if (!timeout) {
                return this.deleteTimeout(name);
            }
            this.deleteTimeout(name);
            const jwtRefreshTokenDeletedEvent = new jwt_refresh_token_deleted_evet_1.JwtRefreshTokenDeletedEvent();
            jwtRefreshTokenDeletedEvent.name = name;
            jwtRefreshTokenDeletedEvent.userId = refreshTokenId;
            jwtRefreshTokenDeletedEvent.description = `deleted user refresh token: ${refreshTokenId}`;
            return this.eventEmitter.emit('refreshtoken.deleted', jwtRefreshTokenDeletedEvent);
        });
        this.Logger.warn(`Timeout ${name} executing!`);
        const timeout = setTimeout(callback, milliseconds);
        this.schedulerRegistry.addTimeout(name, timeout);
        return timeout;
    }
    deleteTimeout(name) {
        this.schedulerRegistry.deleteTimeout(name);
        this.Logger.log(`Timeout ${name} deleted!`);
        return;
    }
};
__decorate([
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof signup_dto_1.SignupDto !== "undefined" && signup_dto_1.SignupDto) === "function" ? _l : Object, typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object, typeof (_o = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _o : Object, typeof (_p = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _p : Object, String]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], AuthService.prototype, "signup", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _r : Object, typeof (_s = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _s : Object, typeof (_t = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _t : Object, String]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], AuthService.prototype, "logout", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _v : Object, typeof (_w = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _w : Object, typeof (_x = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _x : Object, String, String]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], AuthService.prototype, "refresh", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_z = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _z : Object, typeof (_0 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _0 : Object, typeof (_1 = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _1 : Object, String, Number, String, String]),
    __metadata("design:returntype", typeof (_2 = typeof Promise !== "undefined" && Promise) === "function" ? _2 : Object)
], AuthService.prototype, "activate", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_3 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _3 : Object, typeof (_4 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _4 : Object, typeof (_5 = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _5 : Object, typeof (_6 = typeof change_password_dto_1.ChangeDto !== "undefined" && change_password_dto_1.ChangeDto) === "function" ? _6 : Object, Number, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "changePassword", null);
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_refresh_service_2.OwnerJwtRefreshService !== "undefined" && jwt_refresh_service_2.OwnerJwtRefreshService) === "function" ? _a : Object, typeof (_b = typeof jwt_refresh_service_3.AdminJwtRefreshService !== "undefined" && jwt_refresh_service_3.AdminJwtRefreshService) === "function" ? _b : Object, typeof (_c = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _c : Object, typeof (_d = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _d : Object, typeof (_e = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _e : Object, typeof (_f = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _f : Object, typeof (_g = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _g : Object, typeof (_h = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _h : Object, typeof (_j = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _j : Object, typeof (_k = typeof jwt_refresh_service_1.UserJwtRefreshTokenService !== "undefined" && jwt_refresh_service_1.UserJwtRefreshTokenService) === "function" ? _k : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c28e5b9febd0bb043512")
/******/ })();
/******/ 
/******/ }
;