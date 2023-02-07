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
exports.AdminUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const admin_constants_1 = require("../../admin/constants/admin.constants");
const auth_constants_1 = require("../../auth/auth.constants");
const admin_service_1 = require("../../admin/services/admin.service");
const api_exception_1 = require("../exceptions/api.exception");
let AdminUserMiddleware = class AdminUserMiddleware {
    constructor(adminService) {
        this.adminService = adminService;
    }
    use(req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.name;
                const surname = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.surname;
                const email = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email;
                const phoneNumber = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.phoneNumber;
                const isAdmin = (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.isAdmin;
                const addContent = (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.addContent;
                const editContent = (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.editContent;
                const editWebSite = (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.editWebSite;
                if (!name ||
                    !surname ||
                    !phoneNumber ||
                    !email ||
                    !isAdmin.toString() ||
                    !addContent.toString() ||
                    !editContent.toString() ||
                    !editWebSite.toString()) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.INVALID_PARAMS);
                }
                const admin = yield this.adminService.getAdminByEmail(email);
                if (admin.phoneNumber === phoneNumber) {
                    req.body.password = admin.getPassword();
                    req.body.activationLink = admin.activationLink;
                    return next();
                }
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', admin_constants_1.ADMIN_NOT_FOUND);
            }
            catch (err) {
                return next(err);
            }
        });
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AdminUserMiddleware.prototype, "use", null);
AdminUserMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminUserMiddleware);
exports.AdminUserMiddleware = AdminUserMiddleware;
//# sourceMappingURL=admin-user.middleware.js.map