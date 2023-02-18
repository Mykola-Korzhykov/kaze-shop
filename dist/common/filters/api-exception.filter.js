"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const api_exception_1 = require("../exceptions/api.exception");
let ApiExceptionFilter = class ApiExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.status || 500;
        response.status(status).send({
            success: false,
            message: exception.message,
            rawErrors: exception.errors,
            stack: exception.stack.toString().split(' ')[0] +
                exception.stack.toString().split(' ')[1],
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
ApiExceptionFilter = __decorate([
    (0, common_1.Catch)(api_exception_1.ApiException)
], ApiExceptionFilter);
exports.ApiExceptionFilter = ApiExceptionFilter;
//# sourceMappingURL=api-exception.filter.js.map