import { Injectable, NestMiddleware, Req, Scope } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserJwtRefreshTokenService } from '../../users/services/jwt-refresh.service';
import { Next, Res } from '@nestjs/common/decorators';

@Injectable({ scope: Scope.REQUEST })
export class IsUser implements NestMiddleware {
  constructor(
    private readonly userJwtRefreshTokenService: UserJwtRefreshTokenService,
  ) {}
  async use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const refreshToken = req?.cookies['refreshToken'];
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains',
      );
      if (refreshToken) {
        const decodedToken = Buffer.from(refreshToken, 'base64').toString(
          'ascii',
        );
        const userRefreshToken =
          await this.userJwtRefreshTokenService.findToken(decodedToken);
        req['user'] = userRefreshToken.token.getUser();
      }
      return next();
    } catch (err: unknown) {
      return next(err);
    }
  }
}
