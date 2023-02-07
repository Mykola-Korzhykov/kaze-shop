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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const common_1 = require("@nestjs/common");
let UserMiddleware = class UserMiddleware {
    use(req, res, next) {
        try {
            const userAgent = req.headers['user-agent'];
            res.setHeader('Access-Control-Request-Headers', 'Authorization');
            res.setHeader('Access-Control-Request-Method', 'POST, GET, PUT, PATCH');
            res.setHeader('Timing-Allow-Origin', `${process.env.CLIENT_URL.trim()}`);
            res.setHeader('X-Content-Type-Options', 'nosniff');
            req['userAgent'] = userAgent;
            return next();
        }
        catch (err) {
            return next(err);
        }
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserMiddleware.prototype, "use", null);
UserMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST })
], UserMiddleware);
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=user.middleware.js.map