import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  Req,
  Scope,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { OwnerJwtRefreshService } from '../../owner/services/jwt-refresh.service';
import { AdminJwtRefreshService } from '../../admin/services/jwt-refresh.service';
import { UserJwtRefreshTokenService } from '../../users/services/jwt-refresh.service';
import { Next, Res } from '@nestjs/common/decorators';
import {
  REFRESH_TOKEN_NOT_PROVIDED,
  INVALID_REFRESH_TOKEN,
} from '../../auth/auth.constants';
import { ApiException } from '../exceptions/api.exception';
@Injectable({ scope: Scope.REQUEST })
export class InitializeUserMiddleware implements NestMiddleware {
  constructor(
    private readonly ownerJwtRefreshTokenService: OwnerJwtRefreshService,
    private readonly adminJwtRefreshTokenService: AdminJwtRefreshService,
    private readonly userJwtRefreshTokenService: UserJwtRefreshTokenService,
  ) {}
  async use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const refreshToken = req?.cookies['refreshToken'];
    if (!refreshToken) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request!',
        REFRESH_TOKEN_NOT_PROVIDED,
      );
    }
    const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
    try {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains',
      );
      const ownerRefreshToken =
        await this.ownerJwtRefreshTokenService.findToken(decodedToken);
      if (ownerRefreshToken) {
        req['type'] = 'OWNER';
        return next();
      }
      const adminRefreshToken =
        await this.adminJwtRefreshTokenService.findToken(decodedToken);
      if (adminRefreshToken) {
        req['type'] = 'ADMIN';
        return next();
      }
      const userRefreshToken = await this.userJwtRefreshTokenService.findToken(
        decodedToken,
      );
      if (!userRefreshToken) {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          'Bad request!',
          INVALID_REFRESH_TOKEN,
        );
      }
      req['type'] = null;
      return next();
    } catch (err: unknown) {
      return next(err);
    }
  }
}
