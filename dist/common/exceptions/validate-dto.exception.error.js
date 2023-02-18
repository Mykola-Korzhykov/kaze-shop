"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.NotFoundError = exports.ApiError = void 0;
const common_1 = require("@nestjs/common");
class ApiError extends Error {
    constructor(statusCode, message, rawErrors) {
        super(message);
        this.rawErrors = [];
        this.statusCode = statusCode;
        if (rawErrors) {
            this.rawErrors = rawErrors;
        }
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApiError = ApiError;
class NotFoundError extends ApiError {
    constructor(path) {
        super(common_1.HttpStatus.NOT_FOUND, `The requested path ${path} not found!`);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends ApiError {
    constructor(message, errors) {
        super(common_1.HttpStatus.BAD_REQUEST, message, errors);
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=validate-dto.exception.error.js.map