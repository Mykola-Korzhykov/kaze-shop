"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const common_1 = require("@nestjs/common");
exports.Type = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (data === 'REFRESHTOKEN') {
        const type = request['type'];
        return data ? type : request['type'];
    }
    if (data === 'CODEDTO') {
        const email = request['codeDto'];
        return data ? email : request['codeDto'];
    }
    if (data === 'ACTIVATE') {
        const type = request['type'];
        return data ? type : request['type'];
    }
});
//# sourceMappingURL=user-type.decorator.js.map