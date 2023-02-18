"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAgent = void 0;
const common_1 = require("@nestjs/common");
exports.UserAgent = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const userAgent = request['userAgent'];
    return data ? userAgent : request['userAgent'];
});
//# sourceMappingURL=user-agent.decorator.js.map