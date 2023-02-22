import { HttpStatus } from '@nestjs/common';
import {
  ADMIN_ID_NOT_PROVIDED,
  ADMIN_OR_ROLE_NOT_FOUND,
  ADMIN_WITH_EMAIL_DOESNT_EXIST,
  ADMIN_WITH_EMAIL_EXIST,
  ADMIN_WITH_PHONENUMBER_EXIST,
} from '../../admin/constants/admin.constants';
import {
  ACCESS_DENIED,
  NOT_ACTIVATED,
  OWNER_ID_NOT_PROVIDED,
  OWNER_OR_ROLE_NOT_FOUND,
  OWNER_WITH_EMAIL_DOESNT_EXIST,
  OWNER_WITH_EMAIL_EXIST,
  OWNER_WITH_PHONENUMBER_EXIST,
} from '../../owner/constants/owner.constants';
import { ADMIN_NOT_FOUND } from '../../admin/constants/jwt-refresh.constants';
import { OWNER_NOT_FOUND } from '../../owner/constants/jwt-refresh.constants';
import {
  ERROR_WHILE_REMOVING_TOKEN,
  ERROR_WHILE_SAVING_TOKEN,
  ERROR_WHILE_SIGNING_TOKEN,
  ERROR_WHILE_VALIDATING_TOKEN,
  TOKEN_INVALID,
  TOKEN_NOT_FOUND,
} from '../../users/constants/jwt-refresh.constants';
import {
  INVALID_CODE,
  INVALID_EMAIL,
  INVALID_EMAIL_OR_PASSWORD,
  RESET_TIME_EXPIRED,
  USER_NOT_FOUND,
  USER_OR_ROLE_NOT_FOUND,
  USER_WITH_EMAIL_DOESNT_EXIST,
  USER_WITH_EMAIL_EXIST,
  USER_WITH_PHONENUMBER_EXIST,
} from '../../users/constants/user.constants';

export class ApiException extends Error {
  status: number;
  errors: { locale: string; error: string }[];

  constructor(
    status: number,
    message: string,
    errors: {
      ua: string;
      ru: string;
      en: string;
      rs: string;
    },
  ) {
    super(message);
    this.status = status;
    this.errors = [
      { locale: 'ua', error: errors.ua },
      { locale: 'ru', error: errors.ru },
      { locale: 'en', error: errors.en },
      { locale: 'rs', error: errors.rs },
    ];
  }

  static BadRequest(
    type:
      | 'USER_WITH_EMAIL_EXIST'
      | 'USER_WITH_PHONENUMBER_EXIST'
      | 'USER_WITH_EMAIL_DOESNT_EXIST'
      | 'INVALID_EMAIL'
      | 'RESET_TIME_EXPIRED'
      | 'ADMIN_WITH_EMAIL_EXIST'
      | 'ADMIN_WITH_PHONENUMBER_EXIST'
      | 'ADMIN_WITH_EMAIL_DOESNT_EXIST'
      | 'OWNER_WITH_EMAIL_EXIST'
      | 'OWNER_WITH_PHONENUMBER_EXIST'
      | 'OWNER_WITH_EMAIL_DOESNT_EXIST'
      | 'INVALID_CODE'
      | 'TOKEN_INVALID',
  ) {
    if ((type = 'USER_WITH_EMAIL_EXIST')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        USER_WITH_EMAIL_EXIST,
      );
    }
    if ((type = 'USER_WITH_PHONENUMBER_EXIST')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        USER_WITH_PHONENUMBER_EXIST,
      );
    }
    if ((type = 'USER_WITH_EMAIL_DOESNT_EXIST')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        USER_WITH_EMAIL_DOESNT_EXIST,
      );
    }
    if ((type = 'ADMIN_WITH_EMAIL_EXIST')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        ADMIN_WITH_EMAIL_EXIST,
      );
    }
    if ((type = 'ADMIN_WITH_PHONENUMBER_EXIST')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        ADMIN_WITH_PHONENUMBER_EXIST,
      );
    }
    if ((type = 'ADMIN_WITH_EMAIL_DOESNT_EXIST')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        ADMIN_WITH_EMAIL_DOESNT_EXIST,
      );
    }
    if ((type = 'OWNER_WITH_EMAIL_EXIST')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        OWNER_WITH_EMAIL_EXIST,
      );
    }
    if ((type = 'OWNER_WITH_PHONENUMBER_EXIST')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        OWNER_WITH_PHONENUMBER_EXIST,
      );
    }
    if ((type = 'OWNER_WITH_EMAIL_DOESNT_EXIST')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        OWNER_WITH_EMAIL_DOESNT_EXIST,
      );
    }
    if ((type = 'INVALID_EMAIL')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        INVALID_EMAIL,
      );
    }
    if ((type = 'RESET_TIME_EXPIRED')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        RESET_TIME_EXPIRED,
      );
    }
    if ((type = 'INVALID_CODE')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        INVALID_CODE,
      );
    }
    if ((type = 'TOKEN_INVALID')) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        TOKEN_INVALID,
      );
    }
  }

  static UserNotFound(
    type:
      | 'USER_NOT_FOUND'
      | 'USER_OR_ROLE_NOT_FOUND'
      | 'TOKEN_NOT_FOUND'
      | 'OWNER_NOT_FOUND'
      | 'ADMIN_NOT_FOUND'
      | 'OWNER_OR_ROLE_NOT_FOUND'
      | 'ADMIN_OR_ROLE_NOT_FOUND',
  ) {
    if ((type = 'USER_NOT_FOUND')) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        USER_NOT_FOUND,
      );
    }
    if ((type = 'USER_OR_ROLE_NOT_FOUND')) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        USER_OR_ROLE_NOT_FOUND,
      );
    }
    if ((type = 'TOKEN_NOT_FOUND')) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        TOKEN_NOT_FOUND,
      );
    }
    if ((type = 'OWNER_NOT_FOUND')) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        OWNER_NOT_FOUND,
      );
    }
    if ((type = 'ADMIN_NOT_FOUND')) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        ADMIN_NOT_FOUND,
      );
    }
    if ((type = 'OWNER_OR_ROLE_NOT_FOUND')) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        OWNER_OR_ROLE_NOT_FOUND,
      );
    }
    if ((type = 'ADMIN_OR_ROLE_NOT_FOUND')) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        ADMIN_OR_ROLE_NOT_FOUND,
      );
    }
  }

  static UnauthorizedError(
    type:
      | 'INVALID_EMAIL_OR_PASSWORD'
      | 'OWNER_ID_NOT_PROVIDED'
      | 'ADMIN_ID_NOT_FOUND',
  ) {
    if ((type = 'INVALID_EMAIL_OR_PASSWORD')) {
      throw new ApiException(
        HttpStatus.UNAUTHORIZED,
        'Unathorized!',
        INVALID_EMAIL_OR_PASSWORD,
      );
    }
    if ((type = 'OWNER_ID_NOT_PROVIDED')) {
      throw new ApiException(
        HttpStatus.UNAUTHORIZED,
        'Unathorized!',
        OWNER_ID_NOT_PROVIDED,
      );
    }
    if ((type = 'ADMIN_ID_NOT_FOUND')) {
      throw new ApiException(
        HttpStatus.UNAUTHORIZED,
        'Unathorized!',
        ADMIN_ID_NOT_PROVIDED,
      );
    }
  }

  static InternalServerError(
    type:
      | 'ERROR_WHILE_SIGNING_TOKEN'
      | 'ERROR_WHILE_VALIDATING_TOKEN'
      | 'ERROR_WHILE_SAVING_TOKEN'
      | 'ERROR_WHILE_REMOVING_TOKEN',
  ) {
    if ((type = 'ERROR_WHILE_SIGNING_TOKEN')) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_SIGNING_TOKEN,
      );
    }
    if ((type = 'ERROR_WHILE_VALIDATING_TOKEN')) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_VALIDATING_TOKEN,
      );
    }
    if ((type = 'ERROR_WHILE_SAVING_TOKEN')) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_SAVING_TOKEN,
      );
    }
    if ((type = 'ERROR_WHILE_REMOVING_TOKEN')) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_REMOVING_TOKEN,
      );
    }
  }

  static ForbiddenException(type: 'NOT_ACTIVATED' | 'ACCESS_DENIED') {
    if ((type = 'NOT_ACTIVATED')) {
      throw new ApiException(HttpStatus.FORBIDDEN, 'Forbidden!', NOT_ACTIVATED);
    }
    if ((type = 'ACCESS_DENIED')) {
      throw new ApiException(HttpStatus.FORBIDDEN, 'Forbidden!', ACCESS_DENIED);
    }
  }
}
