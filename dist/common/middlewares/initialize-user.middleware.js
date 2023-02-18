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
exports.InitializeUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_refresh_service_1 = require("../../owner/services/jwt-refresh.service");
const jwt_refresh_service_2 = require("../../admin/services/jwt-refresh.service");
const jwt_refresh_service_3 = require("../../users/services/jwt-refresh.service");
const decorators_1 = require("@nestjs/common/decorators");
const auth_constants_1 = require("../../auth/auth.constants");
const api_exception_1 = require("../exceptions/api.exception");
let InitializeUserMiddleware = class InitializeUserMiddleware {
    constructor(ownerJwtRefreshTokenService, adminJwtRefreshTokenService, userJwtRefreshTokenService) {
        this.ownerJwtRefreshTokenService = ownerJwtRefreshTokenService;
        this.adminJwtRefreshTokenService = adminJwtRefreshTokenService;
        this.userJwtRefreshTokenService = userJwtRefreshTokenService;
    }
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req === null || req === void 0 ? void 0 : req.cookies['refreshToken'];
            if (!refreshToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.REFRESH_TOKEN_NOT_PROVIDED);
            }
            const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
            try {
                res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
                const ownerRefreshToken = yield this.ownerJwtRefreshTokenService.findToken(decodedToken);
                if (ownerRefreshToken) {
                    req['type'] = 'OWNER';
                    return next();
                }
                const adminRefreshToken = yield this.adminJwtRefreshTokenService.findToken(decodedToken);
                if (adminRefreshToken) {
                    req['type'] = 'ADMIN';
                    return next();
                }
                const userRefreshToken = yield this.userJwtRefreshTokenService.findToken(decodedToken);
                if (!userRefreshToken) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.INVALID_REFRESH_TOKEN);
                }
                req['type'] = null;
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
], InitializeUserMiddleware.prototype, "use", null);
InitializeUserMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [jwt_refresh_service_1.OwnerJwtRefreshService,
        jwt_refresh_service_2.AdminJwtRefreshService,
        jwt_refresh_service_3.UserJwtRefreshTokenService])
], InitializeUserMiddleware);
exports.InitializeUserMiddleware = InitializeUserMiddleware;
//# sourceMappingURL=initialize-user.middleware.js.map