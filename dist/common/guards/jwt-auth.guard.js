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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("../../auth/auth.constants");
const auth_service_1 = require("../../auth/auth.service");
const api_exception_1 = require("../exceptions/api.exception");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            const bearer = authHeader.split(' ')[0];
            const accessToken = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !accessToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            const decodedToken = Buffer.from(accessToken, 'base64').toString('ascii');
            let payload;
            try {
                payload = yield this.authService.validateAccessToken(decodedToken);
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            if (!payload) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            req.payload = payload;
            return true;
        }))();
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth.guard.js.map