import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { payload } from '../../core/interfaces/auth.interfaces';
import { REFRESH_TOKEN_NOT_PROVIDED, USER_NOT_AUTHORIZIED } from '../../auth/auth.constants';
import { AdminJwtRefreshService } from '../../admin/services/jwt-refresh.service';
import { AdminRefreshToken } from '../../admin/models/admin.refresh.token.model';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import { AuthService } from '../../auth/auth.service';
import { ApiException } from '../exceptions/api.exception';

@Injectable({ scope: Scope.REQUEST })
export class AdminGuard implements CanActivate {
  constructor(
    private readonly adminJwtRefreshTokenService: AdminJwtRefreshService,
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return (async () => {
      const requiredRoles: string[] = this.reflector.getAllAndOverride(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const refreshToken = req?.cookies['refreshToken'];
      const accessToken = req?.cookies['accessToken'];
      if (!refreshToken) {
        throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request!', REFRESH_TOKEN_NOT_PROVIDED);
      }
      const decodedToken = Buffer.from(refreshToken, 'base64').toString(
        'ascii',
      );
      const userRefreshToken = await this.adminJwtRefreshTokenService.findToken(
        decodedToken,
      );
      const decodedAccessToken = Buffer.from(accessToken, 'base64').toString(
        'ascii',
      );
      if (process.env.NODE_ENV === 'production') {
        const accessPayload = await this.authService.validateAccessToken(
          decodedAccessToken,
        );
        if (
          !accessPayload.roles.some(
            (role: { value: string; description: string }) =>
              requiredRoles.includes(role.value),
          )
        ) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
        }
      }
      if (!userRefreshToken) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
      }
      const payload: payload = req?.payload;
      if (!payload) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
      }
      if (
        userRefreshToken instanceof AdminRefreshToken &&
        payload.userId !== userRefreshToken.adminId
      ) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
      }
      const refreshPayload =
        await this.adminJwtRefreshTokenService.validateRefreshToken(
          decodedToken,
        );
      return refreshPayload.roles.some(
        (role: { value: string; description: string }) =>
          requiredRoles.includes(role.value),
      );
    })();
  }
}
