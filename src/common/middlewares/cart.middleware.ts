import {
  Injectable,
  Scope,
  NestMiddleware,
  Req,
  Res,
  Next,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IDENTIFIER_NOT_PROVIDED } from '../../cart/cart.constants';
import { AdminJwtRefreshService } from '../../admin/services/jwt-refresh.service';
import { INVALID_REFRESH_TOKEN } from '../../auth/auth.constants';
import { OwnerJwtRefreshService } from '../../owner/services/jwt-refresh.service';
import { UserJwtRefreshTokenService } from '../../users/services/jwt-refresh.service';
import { ApiException } from '../exceptions/api.exception';
import { CartService } from '../../cart/cart.service';

@Injectable({ scope: Scope.REQUEST })
export class CartMiddleware implements NestMiddleware {
  constructor(
    private readonly ownerJwtRefreshTokenService: OwnerJwtRefreshService,
    private readonly adminJwtRefreshTokenService: AdminJwtRefreshService,
    private readonly userJwtRefreshTokenService: UserJwtRefreshTokenService,
    private readonly cartService: CartService,
  ) {}
  async use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const userAgent = req.headers['user-agent'];
      res.setHeader('Access-Control-Request-Headers', 'Authorization');
      res.setHeader('Access-Control-Request-Method', 'POST, GET, DELETE');
      res.setHeader('Timing-Allow-Origin', `${process.env.ACCESS_ALLOW}`);
      req['userAgent'] = userAgent;
      const refreshToken = req?.cookies['refreshToken'];
      if (refreshToken) {
        const decodedToken = Buffer.from(refreshToken, 'base64').toString(
          'ascii',
        );
        res.setHeader(
          'Strict-Transport-Security',
          'max-age=31536000; includeSubDomains',
        );
        const ownerRefreshToken =
          await this.ownerJwtRefreshTokenService.findToken(decodedToken);
        if (ownerRefreshToken) {
          req['user'] = ownerRefreshToken.token.getOwner();
          return next();
        }
        const adminRefreshToken =
          await this.adminJwtRefreshTokenService.findToken(decodedToken);
        if (adminRefreshToken) {
          req['user'] = adminRefreshToken.token.getAdmin();
          return next();
        }
        const userRefreshToken =
          await this.userJwtRefreshTokenService.findToken(decodedToken);
        if (!userRefreshToken) {
          throw new ApiException(
            HttpStatus.BAD_REQUEST,
            'Bad request!',
            INVALID_REFRESH_TOKEN,
          );
        }
        req['user'] = userRefreshToken.token.getUser();
        return next();
      }
      req['user'] = null;
      const cartIdentifier = req.signedCookies['_id'];
      if (!cartIdentifier) {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          'Bad request!',
          IDENTIFIER_NOT_PROVIDED,
        );
      }
      await this.cartService.findCartByIdentifier(cartIdentifier);
      return next();
    } catch (err: unknown) {
      return next(err);
    }
  }
}
