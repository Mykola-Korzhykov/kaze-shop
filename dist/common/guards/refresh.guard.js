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
exports.RefreshAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("../../auth/auth.constants");
const auth_service_1 = require("../../auth/auth.service");
const api_exception_1 = require("../exceptions/api.exception");
let RefreshAuthGuard = class RefreshAuthGuard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.INVALID_HEADER);
        }
        const bearer = authHeader.split(' ')[0];
        const accessToken = authHeader.split(' ')[1];
        if (bearer !== 'Bearer' || !accessToken) {
            throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.ACCESS_TOKEN_NOT_PROVIDED);
        }
        return true;
    }
};
RefreshAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], RefreshAuthGuard);
exports.RefreshAuthGuard = RefreshAuthGuard;
//# sourceMappingURL=refresh.guard.js.map