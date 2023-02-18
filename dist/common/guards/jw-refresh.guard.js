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
exports.AuthFerfershGuard = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../../admin/services/admin.service");
const owner_service_1 = require("../../owner/services/owner.service");
const users_service_1 = require("../../users/services/users.service");
const user_constants_1 = require("../../users/constants/user.constants");
const api_exception_1 = require("../exceptions/api.exception");
const auth_constants_1 = require("../../auth/auth.constants");
let AuthFerfershGuard = class AuthFerfershGuard {
    constructor(ownerService, adminService, userService) {
        this.ownerService = ownerService;
        this.adminService = adminService;
        this.userService = userService;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            const req = context.switchToHttp().getRequest();
            const payload = req === null || req === void 0 ? void 0 : req.payload;
            const type = req['type'];
            if (!payload) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.INVALID_REQUEST);
            }
            if (type === undefined) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_DETECTED);
            }
            if (type && type === 'OWNER') {
                const activationLink = req === null || req === void 0 ? void 0 : req.signedCookies['user-id'];
                if (!activationLink) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', auth_constants_1.NO_LINK_PROVIDED);
                }
                return this.ownerService.checkOwner(payload, activationLink);
            }
            if (type && type === 'ADMIN') {
                const activationLink = req === null || req === void 0 ? void 0 : req.signedCookies['user-id'];
                if (!activationLink) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', auth_constants_1.NO_LINK_PROVIDED);
                }
                return this.adminService.checkAdmin(payload, activationLink);
            }
            const user = yield this.userService.getUserById(payload.userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            return true;
        }))();
    }
};
AuthFerfershGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [owner_service_1.OwnerService,
        admin_service_1.AdminService,
        users_service_1.UsersService])
], AuthFerfershGuard);
exports.AuthFerfershGuard = AuthFerfershGuard;
//# sourceMappingURL=jw-refresh.guard.js.map