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
exports.UserGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_refresh_service_1 = require("../../users/services/jwt-refresh.service");
const auth_constants_1 = require("../../auth/auth.constants");
const core_1 = require("@nestjs/core");
const roles_auth_decorator_1 = require("../decorators/roles-auth.decorator");
const auth_service_1 = require("../../auth/auth.service");
const api_exception_1 = require("../exceptions/api.exception");
let UserGuard = class UserGuard {
    constructor(userJwtRefreshTokenService, reflector, authService) {
        this.userJwtRefreshTokenService = userJwtRefreshTokenService;
        this.reflector = reflector;
        this.authService = authService;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            const requiredRoles = this.reflector.getAllAndOverride(roles_auth_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const accessToken = req === null || req === void 0 ? void 0 : req.cookies['accessToken'];
            const refreshToken = req === null || req === void 0 ? void 0 : req.cookies['refreshToken'];
            if (!refreshToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.REFRESH_TOKEN_NOT_PROVIDED);
            }
            const decodedRefreshToken = Buffer.from(refreshToken, 'base64').toString('ascii');
            if (process.env.NODE_ENV === 'production') {
                const decodedAccessToken = Buffer.from(accessToken, 'base64').toString('ascii');
                const accessPayload = yield this.authService.validateAccessToken(decodedAccessToken);
                if (!accessPayload.roles.some((role) => requiredRoles.includes(role.value))) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
            }
            const userRefreshToken = yield this.userJwtRefreshTokenService.findToken(decodedRefreshToken);
            if (!userRefreshToken) {
                return false;
            }
            const payload = req === null || req === void 0 ? void 0 : req.payload;
            if (!payload) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            if (payload.userId !== userRefreshToken.userId) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            const refreshPayload = yield this.userJwtRefreshTokenService.validateRefreshToken(decodedRefreshToken.trim());
            return refreshPayload.roles.some((role) => requiredRoles.includes(role.value));
        }))();
    }
};
UserGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [jwt_refresh_service_1.UserJwtRefreshTokenService,
        core_1.Reflector,
        auth_service_1.AuthService])
], UserGuard);
exports.UserGuard = UserGuard;
//# sourceMappingURL=user.guard.js.map