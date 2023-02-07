export declare class ApiException extends Error {
    status: number;
    errors: {
        locale: string;
        error: string;
    }[];
    constructor(status: number, message: string, errors: {
        ua: string;
        ru: string;
        en: string;
        rs: string;
    });
    static BadRequest(type: 'USER_WITH_EMAIL_EXIST' | 'USER_WITH_PHONENUMBER_EXIST' | 'USER_WITH_EMAIL_DOESNT_EXIST' | 'INVALID_EMAIL' | 'RESET_TIME_EXPIRED' | 'ADMIN_WITH_EMAIL_EXIST' | 'ADMIN_WITH_PHONENUMBER_EXIST' | 'ADMIN_WITH_EMAIL_DOESNT_EXIST' | 'OWNER_WITH_EMAIL_EXIST' | 'OWNER_WITH_PHONENUMBER_EXIST' | 'OWNER_WITH_EMAIL_DOESNT_EXIST' | 'INVALID_CODE' | 'TOKEN_INVALID'): void;
    static UserNotFound(type: 'USER_NOT_FOUND' | 'USER_OR_ROLE_NOT_FOUND' | 'TOKEN_NOT_FOUND' | 'OWNER_NOT_FOUND' | 'ADMIN_NOT_FOUND' | 'OWNER_OR_ROLE_NOT_FOUND' | 'ADMIN_OR_ROLE_NOT_FOUND'): void;
    static UnauthorizedError(type: 'INVALID_EMAIL_OR_PASSWORD' | 'OWNER_ID_NOT_PROVIDED' | 'ADMIN_ID_NOT_FOUND'): void;
    static InternalServerError(type: 'ERROR_WHILE_SIGNING_TOKEN' | 'ERROR_WHILE_VALIDATING_TOKEN' | 'ERROR_WHILE_SAVING_TOKEN' | 'ERROR_WHILE_REMOVING_TOKEN'): void;
    static ForbiddenException(type: 'NOT_ACTIVATED' | 'ACCESS_DENIED'): void;
}
