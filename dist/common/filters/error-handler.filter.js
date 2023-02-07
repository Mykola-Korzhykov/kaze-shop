"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorExceptionFilter = void 0;
const validate_dto_exception_error_1 = require("../exceptions/validate-dto.exception.error");
const common_1 = require("@nestjs/common");
let ApiErrorExceptionFilter = class ApiErrorExceptionFilter {
    catch(exception, host) {
        var _a;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.statusCode || 500;
        response.status(status).send({
            success: false,
            message: exception.message,
            rawErrors: (_a = exception.rawErrors) !== null && _a !== void 0 ? _a : [],
            stack: exception.stack.toString().split(' ')[0] +
                exception.stack.toString().split(' ')[1],
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
ApiErrorExceptionFilter = __decorate([
    (0, common_1.Catch)(validate_dto_exception_error_1.BadRequestError)
], ApiErrorExceptionFilter);
exports.ApiErrorExceptionFilter = ApiErrorExceptionFilter;
//# sourceMappingURL=error-handler.filter.js.map