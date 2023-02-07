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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_service_1 = require("../../auth/auth.service");
const roles_auth_decorator_1 = require("../decorators/roles-auth.decorator");
const auth_constants_1 = require("../../auth/auth.constants");
const api_exception_1 = require("../exceptions/api.exception");
let RolesGuard = class RolesGuard {
    constructor(authService, reflector) {
        this.authService = authService;
        this.reflector = reflector;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            try {
                const requiredRoles = this.reflector.getAllAndOverride(roles_auth_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
                if (!requiredRoles) {
                    return true;
                }
                const req = context.switchToHttp().getRequest();
                const authHeader = req.headers.authorization;
                const bearer = authHeader.split(' ')[0];
                const token = authHeader.split(' ')[1];
                if (bearer !== 'Bearer' || !token) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                const decodedToken = Buffer.from(token, 'base64').toString('ascii');
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
                return payload.roles.some((role) => requiredRoles.includes(role.value));
            }
            catch (err) {
                throw new common_1.HttpException(auth_constants_1.ACCESS_DENIED, common_1.HttpStatus.FORBIDDEN);
            }
        }))();
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map