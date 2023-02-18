"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const common_1 = require("@nestjs/common");
exports.UserId = (0, common_1.createParamDecorator)((data, ctx) => {
    var _a, _b;
    const request = ctx.switchToHttp().getRequest();
    const userId = (_a = request === null || request === void 0 ? void 0 : request.payload) === null || _a === void 0 ? void 0 : _a.userId;
    return data ? userId : (_b = request === null || request === void 0 ? void 0 : request.payload) === null || _b === void 0 ? void 0 : _b.userId;
});
//# sourceMappingURL=user.id.decorator.js.map