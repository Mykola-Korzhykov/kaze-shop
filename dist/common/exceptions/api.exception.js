"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = void 0;
const common_1 = require("@nestjs/common");
const admin_constants_1 = require("../../admin/constants/admin.constants");
const owner_constants_1 = require("../../owner/constants/owner.constants");
const jwt_refresh_constants_1 = require("../../admin/constants/jwt-refresh.constants");
const jwt_refresh_constants_2 = require("../../owner/constants/jwt-refresh.constants");
const jwt_refresh_constants_3 = require("../../users/constants/jwt-refresh.constants");
const user_constants_1 = require("../../users/constants/user.constants");
class ApiException extends Error {
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = [
            { locale: 'ua', error: errors.ua },
            { locale: 'ru', error: errors.ru },
            { locale: 'en', error: errors.en },
            { locale: 'rs', error: errors.rs },
        ];
    }
    static BadRequest(type) {
        if (type = 'USER_WITH_EMAIL_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_EMAIL_EXIST);
        }
        if (type = 'USER_WITH_PHONENUMBER_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_PHONENUMBER_EXIST);
        }
        if (type = 'USER_WITH_EMAIL_DOESNT_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_EMAIL_DOESNT_EXIST);
        }
        if (type = 'ADMIN_WITH_EMAIL_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_EMAIL_EXIST);
        }
        if (type = 'ADMIN_WITH_PHONENUMBER_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_PHONENUMBER_EXIST);
        }
        if (type = 'ADMIN_WITH_EMAIL_DOESNT_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_EMAIL_DOESNT_EXIST);
        }
        if (type = 'OWNER_WITH_EMAIL_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_EMAIL_EXIST);
        }
        if (type = 'OWNER_WITH_PHONENUMBER_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_PHONENUMBER_EXIST);
        }
        if (type = 'OWNER_WITH_EMAIL_DOESNT_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_EMAIL_DOESNT_EXIST);
        }
        if (type = 'INVALID_EMAIL') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.INVALID_EMAIL);
        }
        if (type = 'RESET_TIME_EXPIRED') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.RESET_TIME_EXPIRED);
        }
        if (type = 'INVALID_CODE') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.INVALID_CODE);
        }
        if (type = 'TOKEN_INVALID') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_3.TOKEN_INVALID);
        }
    }
    static UserNotFound(type) {
        if (type = 'USER_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
        }
        if (type = 'USER_OR_ROLE_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_OR_ROLE_NOT_FOUND);
        }
        if (type = 'TOKEN_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_3.TOKEN_NOT_FOUND);
        }
        if (type = 'OWNER_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_2.OWNER_NOT_FOUND);
        }
        if (type = 'ADMIN_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.ADMIN_NOT_FOUND);
        }
        if (type = 'OWNER_OR_ROLE_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_OR_ROLE_NOT_FOUND);
        }
        if (type = 'ADMIN_OR_ROLE_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', admin_constants_1.ADMIN_OR_ROLE_NOT_FOUND);
        }
    }
    static UnauthorizedError(type) {
        if (type = 'INVALID_EMAIL_OR_PASSWORD') {
            throw new ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', user_constants_1.INVALID_EMAIL_OR_PASSWORD);
        }
        if (type = 'OWNER_ID_NOT_PROVIDED') {
            throw new ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', owner_constants_1.OWNER_ID_NOT_PROVIDED);
        }
        if (type = 'ADMIN_ID_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ADMIN_ID_NOT_PROVIDED);
        }
    }
    static InternalServerError(type) {
        if (type = 'ERROR_WHILE_SIGNING_TOKEN') {
            throw new ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_3.ERROR_WHILE_SIGNING_TOKEN);
        }
        if (type = 'ERROR_WHILE_VALIDATING_TOKEN') {
            throw new ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_3.ERROR_WHILE_VALIDATING_TOKEN);
        }
        if (type = 'ERROR_WHILE_SAVING_TOKEN') {
            throw new ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_3.ERROR_WHILE_SAVING_TOKEN);
        }
        if (type = 'ERROR_WHILE_REMOVING_TOKEN') {
            throw new ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_3.ERROR_WHILE_REMOVING_TOKEN);
        }
    }
    static ForbiddenException(type) {
        if (type = 'NOT_ACTIVATED') {
            throw new ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', owner_constants_1.NOT_ACTIVATED);
        }
        if (type = 'ACCESS_DENIED') {
            throw new ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', owner_constants_1.ACCESS_DENIED);
        }
    }
}
exports.ApiException = ApiException;
//# sourceMappingURL=api.exception.js.map