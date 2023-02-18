import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Payload } from '../../core/interfaces/auth.interfaces';
import { UserJwtRefreshTokenService } from '../../users/services/jwt-refresh.service';
import { REFRESH_TOKEN_NOT_PROVIDED, USER_NOT_AUTHORIZIED } from '../../auth/auth.constants';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import { AuthService } from '../../auth/auth.service';
import { ApiException } from '../exceptions/api.exception';
import { ACCESS_DENIED } from '../../admin/constants/admin.constants';

@Injectable({ scope: Scope.REQUEST })
export class UserGuard implements CanActivate {
  constructor(
    private readonly userJwtRefreshTokenService: UserJwtRefreshTokenService,
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
        if (!refreshToken) {
          throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request!', REFRESH_TOKEN_NOT_PROVIDED);
        }
        const decodedRefreshToken = Buffer.from(refreshToken, 'base64').toString(
          'ascii',
        );
        const userRefreshToken = await this.userJwtRefreshTokenService.findToken(
          decodedRefreshToken,
        );
        if (!userRefreshToken) {
          return false;
        }
        const payload: Payload = req?.payload;
        if (!payload) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
        }
        if (payload.userId !== userRefreshToken.userId) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
        }
        const refreshPayload =
          await this.userJwtRefreshTokenService.validateRefreshToken(
            decodedRefreshToken.trim(),
        );
        if (
          !refreshPayload.roles.some(
          (role: { value: string; description: string }) =>
            requiredRoles.includes(role.value))
        ) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', ACCESS_DENIED);
        }
        return true;
      }
    )();
  }
}
