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
exports.InitializeEmailMiddleware = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const admin_service_1 = require("../../admin/services/admin.service");
const owner_service_1 = require("../../owner/services/owner.service");
const users_service_1 = require("../../users/services/users.service");
const auth_constants_1 = require("../../auth/auth.constants");
const api_exception_1 = require("../exceptions/api.exception");
let InitializeEmailMiddleware = class InitializeEmailMiddleware {
    constructor(ownerService, adminService, userService) {
        this.ownerService = ownerService;
        this.adminService = adminService;
        this.userService = userService;
    }
    use(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const email = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email;
            try {
                if (!email) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', auth_constants_1.EMAIL_NOT_PROVIDED);
                }
                const owner = yield this.ownerService.getOwnerByEmail(email);
                if (owner) {
                    req['codeDto'] = { email: owner.email, type: 'OWNER' };
                    return next();
                }
                const admin = yield this.adminService.getAdminByEmail(email);
                if (admin) {
                    req['codeDto'] = { email: admin.email, type: 'ADMIN' };
                    return next();
                }
                const user = yield this.userService.getUserByEmail(email);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', auth_constants_1.USER_WITH_EMAIL_NOT_FOUND);
                }
                res.setHeader('X-Content-Type-Options', 'nosniff');
                req['codeDto'] = { email: user.email, type: null };
                return next();
            }
            catch (err) {
                return next(err);
            }
        });
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, decorators_1.Res)()),
    __param(2, (0, decorators_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], InitializeEmailMiddleware.prototype, "use", null);
InitializeEmailMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [owner_service_1.OwnerService,
        admin_service_1.AdminService,
        users_service_1.UsersService])
], InitializeEmailMiddleware);
exports.InitializeEmailMiddleware = InitializeEmailMiddleware;
//# sourceMappingURL=initialize-email.middleware.js.map