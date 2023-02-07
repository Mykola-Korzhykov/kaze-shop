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
exports.ActivateMiddleware = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const auth_constants_1 = require("../../auth/auth.constants");
const admin_model_1 = require("../../admin/models/admin.model");
const owner_model_1 = require("../../owner/models/owner.model");
const api_exception_1 = require("../exceptions/api.exception");
let ActivateMiddleware = class ActivateMiddleware {
    constructor(adminRepository, ownerRepository) {
        this.adminRepository = adminRepository;
        this.ownerRepository = ownerRepository;
    }
    use(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activationLink = (_a = req.params) === null || _a === void 0 ? void 0 : _a.link;
                const code = Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.code);
                if (!activationLink || !code) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.ACTIVTING_PARAMS_NOT_PROVIDED);
                }
                res.setHeader('X-Content-Type-Options', 'nosniff');
                const owner = yield this.ownerRepository.findOne({
                    where: {
                        resetToken: activationLink,
                    },
                });
                if (owner &&
                    !owner.getIsActivated() &&
                    Number(Date.now()) < owner.getResetTokenExpiration() &&
                    code === owner.getActivationCode()) {
                    req['activationLink'] = owner.activationLink;
                    req['type'] = 'OWNER';
                    return next();
                }
                const admin = yield this.adminRepository.findOne({
                    where: {
                        resetToken: activationLink,
                    },
                });
                if (admin &&
                    !admin.getIsActivated() &&
                    Number(Date.now()) < admin.getResetTokenExpiration() &&
                    code === admin.getActivationCode()) {
                    req['type'] = 'ADMIN';
                    req['activationLink'] = admin.activationLink;
                    return next();
                }
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.INVALID_PARAMS);
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
], ActivateMiddleware.prototype, "use", null);
ActivateMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, sequelize_1.InjectModel)(admin_model_1.Admin)),
    __param(1, (0, sequelize_1.InjectModel)(owner_model_1.Owner)),
    __metadata("design:paramtypes", [Object, Object])
], ActivateMiddleware);
exports.ActivateMiddleware = ActivateMiddleware;
//# sourceMappingURL=activate.middleware.js.map